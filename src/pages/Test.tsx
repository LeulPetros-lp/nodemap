import { Container, Typography, Button, Input, Box, CircularProgress,TextField } from '@mui/joy';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}


const FlowIcon = () => (
  <svg
    width="48"
    height="38"
    viewBox="0 0 24 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '8px' }}
  >
    <path
      d="M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6"
      stroke="url(#flow-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <animate
        attributeName="d"
        dur="2s"
        repeatCount="indefinite"
        values="
          M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6;
          M2 8C2 8 4 10 6 10C8 10 8.5 8 10 8C11.5 8 12 10 14 10C16 10 16.5 8 18 8C19.5 8 20 10 22 10;
          M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6"
        calcMode="spline"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
      />
    </path>
    <path
      d="M2 8C2 8 4 10 6 10C8 10 8.5 8 10 8C11.5 8 12 10 14 10C16 10 16.5 8 18 8C19.5 8 20 10 22 10"
      stroke="url(#flow-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.3"
      fill="none"
    >
      <animate
        attributeName="strokeOpacity"
        dur="2s"
        repeatCount="indefinite"
        values="0.3;0.5;0.3"
        calcMode="spline"
        keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
      />
    </path>
    <defs>
      <linearGradient id="flow-gradient" x1="2" y1="8" x2="22" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#9C27B0">
          <animate
            attributeName="stop-color"
            dur="2s"
            repeatCount="indefinite"
            values="#9C27B0;#7B1FA2;#9C27B0"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </stop>
        <stop offset="100%" stopColor="#7B1FA2">
          <animate
            attributeName="stop-color"
            dur="2s"
            repeatCount="indefinite"
            values="#7B1FA2;#6A1B9A;#7B1FA2"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
);




const Test = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const userName = currentUser?.displayName?.split(" ")[0] || 'User';
  const [typedText, setTypedText] = useState('');
  const loadingText = "Analyzing your learning goals...";
  const [headingText, setHeadingText] = useState('nodemap');

  useEffect(() => {
    const terms = ['nodemap', 'roadmap', 'journey', 'potential'];
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
      // Try to parse the content as JSON
      const jsonContent = JSON.parse(content);
      localStorage.setItem('learningResponse', JSON.stringify(jsonContent));
      navigate('/learning-path');
    } catch (error) {
      console.error('Invalid JSON response:', error);
      alert('Failed to generate learning path. Please try again.');
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer HItVfoe1SnxFhyJD4NgeERRPpUcFaBMA'
        },
        body: JSON.stringify({
          model: "mistral-tiny",
          messages: [
            {
              role: "system",
              content: `You are an AI learning path generator. You must ALWAYS respond with ONLY valid JSON, following this exact structure:

{
  "nodes": [
    {
      "id": number,
      "label": string,
      "description": string,
      "timeStamp": string
    }
  ]
}

Rules:
1. Each node represents a learning concept
2. IDs must be sequential numbers starting from 1
3. Labels should be concise (max 50 characters)
4. Descriptions should be clear and brief (max 150 characters)
5. TimeStamp should be in format "Day X" where X is the day number
6. Generate 5-10 nodes for each request
7. NEVER include any explanatory text outside the JSON structure
8. NEVER use markdown or code blocks
9. Ensure the JSON is properly formatted and valid

Example response:
{
  "nodes": [
    {
      "id": 1,
      "label": "Python Basics",
      "description": "Core Python syntax including variables, data types, control flow, and basic operations",
      "timeStamp": "Day 1"
    },
    {
      "id": 2,
      "label": "Functions and Modules",
      "description": "Creating reusable code blocks with functions and organizing code into modules",
      "timeStamp": "Day 2"
    }
  ]
}
`
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      await handleResponse(data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
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
              color: 'white',
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
              View Your Learning Path
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Test; 
