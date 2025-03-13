import { Container, Typography, Button, Input, Box, CircularProgress, Stack, Alert, TextField } from '@mui/joy';
import FlowIcon from '../components/Flow';
import extractKeywords from '../utils/keywords';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}





const CreatePath = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const userName = currentUser?.displayName?.split(" ")[0] || 'User';
  const [typedText, setTypedText] = useState('');
  const loadingText = "Analyzing your learning goals...";
  const [headingText, setHeadingText] = useState('nodemap');
  const [alert, setAlert] = useState<{
    message: string;
    color: 'danger' | 'success' | 'primary';
    show: boolean;
  }>({
    message: '',
    color: 'danger',
    show: false,
  });


  
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw error;
    }
  };

  useEffect(() => {
    const terms = ['nodemap', 'roadmap', 'journey', 'roadmap'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % terms.length;
      setHeadingText(terms[currentIndex]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Typing animation effect for loading message
  useEffect(() => {
    if (isLoading && typedText.length < loadingText.length) {
      const timeout = setTimeout(() => {
        setTypedText(loadingText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isLoading, loadingText]);

  // Reset typed text when loading state changes
  useEffect(() => {
    if (!isLoading) {
      setTypedText('');
    }
  }, [isLoading]);

  const handleResponse = async (response: any) => {
    try {
      const content = response.choices[0].message.content;
      console.log('Raw content received:', content);

      try {
        const jsonContent = JSON.parse(content);
        console.log('Parsed JSON:', jsonContent);
        localStorage.setItem('learningResponse', JSON.stringify(jsonContent));
        navigate('/learning-path');
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        console.error('Received content:', content);
        setAlert({
          show: true,
          message: 'Failed to generate valid learning path. Please try again.',
          color: 'danger'
        });
      }
    } catch (error) {
      console.error('Response processing error:', error);
      setAlert({
        show: true,
        message: 'Failed to process the response. Please try again.',
        color: 'danger'
      });
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      setAlert({
        show: true,
        message: 'Please enter a learning topic',
        color: 'danger'
      });
      return;
    }

    setIsLoading(true);
    setTypedText('');

    try {
      const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
      if (!apiKey) {
        throw new Error('API key is not configured');
      }

      const response = await fetchWithTimeout(
        'https://api.mistral.ai/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "mistral-tiny",
            messages: [
              {
                role: "system",
                content: `You are an expert educational curriculum designer. You must respond ONLY with a JSON object, no markdown, no introduction, no additional text.

RESPONSE MUST BE EXACTLY IN THIS FORMAT (replace example values only):

{
  "mindmap": {
    "rootNode": {
      "id": "root",
      "label": "Main Topic",
      "description": "Brief overview of the main topic"
    },
    "nodes": [
      {
        "id": "node1",
        "parentId": "root",
        "label": "Major Concept 1",
        "description": "Description of the concept",
        "difficulty": "beginner|intermediate|advanced",
        "estimatedHours": 10,
        "resources": [
          {
            "keyword_name": "Keyword Name",
            "url": "optional_url"
          }
        ],
        "subNodes": [
          {
            "id": "subnode1",
            "label": "Sub-concept",
            "description": "Detailed explanation",
            "prerequisites": ["node-ids"]
          }
        ]
      }
    ],
    "connections": [
      {
        "from": "node-id",
        "to": "node-id",
        "relationship": "prerequisite|related|leads-to"
      }
    ]
  }
}

RULES:
1. Respond ONLY with the JSON structure above
2. No markdown, no introduction, no explanation
3. Generate minimum 10 main nodes MUST which is until node10
4. Each main node must have 2-4 subnodes
5. Each subnode must have 2-3 prerequisites and other subnode
6. Include meaningful connections between nodes
7. All IDs must be unique
8. Every subnode must have a parent node`
              },
              {
                role: "user",
                content: `Create a detailed learning path for: ${input}`
              }
            ],
            temperature: 0.3, // Reduced from 0.7 for more focused responses
            max_tokens: 4000  // Increased from 1500 to accommodate larger responses
          })
        },
        60000
      );

      if (response.choices && response.choices[0]?.message?.content) {
        await handleResponse(response);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('API Error:', error);
      let errorMessage = 'An error occurred while generating your learning path.';
      
      if (error.message.includes('API key')) {
        errorMessage = 'API configuration error. Please contact support.';
      } else if (error.message.includes('timed out')) {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      setAlert({
        show: true,
        message: errorMessage,
        color: 'danger'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSpecialMap = () => {
    navigate('/mindmap');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '90vh',
      justifyContent: 'center',
      alignItems: 'center',
      px: 2
    }}>
      <Container sx={{
        maxWidth: '800px !important',
        textAlign: 'center'
      }}>
        {/* Welcome Message (static) */}
        <Box sx={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4
        }}>
          <Typography
            level="h2"
            sx={{
              color: '#fff',
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              textAlign: 'center',
              background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '600',
              letterSpacing: '-0.5px',
              fontFamily: "'Poppins', sans-serif",
              '& .changing-text': {
                color: '#9C27B0',
                WebkitTextFillColor: '#9C27B0',
                display: 'inline-block',
                position: 'relative',
                animation: 'fadeInOut 3s infinite',
                marginLeft: '8px', // Add space between text and changing word
              },
              '@keyframes fadeInOut': {
                '0%, 100%': {
                  opacity: 0,
                  transform: 'translateY(10px)',
                },
                '20%, 80%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
                '90%': {
                  opacity: 0,
                  transform: 'translateY(-10px)',
                },
              }
            }}
          >
            Navigate through your<span className="changing-text">{"  " + headingText}</span>
          </Typography>
        </Box>

        {/* Input and Button Container */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: '600px',
          mx: 'auto'
        }}>
          <Input
            size="lg"
            placeholder="What would you like to learn today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            sx={{
              '--Input-focusedThickness': '2px',
              '--Input-focusedHighlight': '#9C27B0',
              '--Input-radius': '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '1.1rem',
              p: 1.5,
              width: '100%',
              '&:hover': {
                borderColor: 'rgba(156, 39, 176, 0.3)',
              },
              '& input': {
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 0.7,
                },
              },
              '&:focus-within': {
                borderColor: '#9C27B0',
                boxShadow: '0 0 0 3px rgba(156, 39, 176, 0.25)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          />

          {!isLoading && !response && (
            <Button
              size="lg"
              onClick={handleSubmit}
              sx={{
                background: 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)',
                  transform: 'translateY(-2px)',
                },
                transition: 'transform 0.2s',
              }}
            >
              Generate Learning Path
            </Button>
          )}

          {isLoading && (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mb: -4 // Reduce bottom margin by 4 units
            }}>
              {/* Make FlowIcon 3 units bigger and 5 units lower */}
              <Box sx={{
                transform: 'scale(3)',
                mt: 5 // Move icon 5 units lower
              }}>
                <FlowIcon />
              </Box>

              {/* Loading text without cursor */}
              <Box sx={{ mt: 4, textAlign: 'center', mb: 2 }}>
                <Typography
                  level="body-lg"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    position: 'relative',
                    // Removed the cursor animation styles
                  }}
                >
                  {typedText}
                </Typography>

                {/* Additional loading text */}
                <Typography
                  level="body-md"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    mt: 1,
                    fontStyle: 'italic'
                  }}
                >
                  Analyzing keywords • Building your nodemap • Creating connections
                </Typography>
              </Box>
            </Box>
          )}

          {response && !isLoading && (
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ 
                width: '100%',
                justifyContent: 'center' 
              }}
            >
              <Button
                size="lg"
                onClick={handleViewResponse}
                sx={{
                  background: 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                View Detailed Path
              </Button>
              <Button
                size="lg"
                onClick={handleViewSpecialMap}
                sx={{
                  background: 'transparent',
                  border: '2px solid #9C27B0',
                  color: 'white',
                  '&:hover': {
                    background: 'rgba(156, 39, 176, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 0.2s',
                }}
              >
                View Visual Map
              </Button>
            </Stack>
          )}
        </Box>
      </Container>
      {alert.show && (
        <Alert
          variant="soft"
          color={alert.color}
          sx={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            minWidth: '300px',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease-out',
            backgroundColor: 'rgba(156, 39, 176, 0.25)', // Increased opacity
            color: 'rgba(255, 255, 255, 0.95)', // More visible text
            border: '1px solid rgba(156, 39, 176, 0.5)', // More visible border
            boxShadow: '0 2px 12px rgba(156, 39, 176, 0.2)', // Added subtle glow
            '& .MuiAlert-message': {
              color: 'rgba(255, 255, 255, 0.95)', // More visible text
              fontWeight: 500, // Slightly bolder text
            },
            '@keyframes slideIn': {
              from: {
                transform: 'translateX(100%)',
                opacity: 0,
              },
              to: {
                transform: 'translateX(0)',
                opacity: 1,
              },
            },
          }}
        >
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default CreatePath; 
