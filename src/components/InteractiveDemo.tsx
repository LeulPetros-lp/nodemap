import { Box, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
  active?: boolean;
  connected?: boolean;
}

const demoTopic = "Machine Learning Fundamentals";

const InteractiveDemo = () => {
  const [typedText, setTypedText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showNodes, setShowNodes] = useState(false);

  // Responsive node positions
  const getNodePositions = () => {
    const isMobile = window.innerWidth < 600;
    const isTablet = window.innerWidth < 960;

    if (isMobile) {
      return [
        { id: 1, label: "A", x: 100, y: 150 },
        { id: 2, label: "B", x: 250, y: 150 },
        { id: 3, label: "C", x: 400, y: 150 },
        { id: 4, label: "D", x: 175, y: 250 },
        { id: 5, label: "E", x: 325, y: 250 },
        { id: 6, label: "F", x: 250, y: 350 },
      ];
    } else if (isTablet) {
      return [
        { id: 1, label: "A", x: 150, y: 150 },
        { id: 2, label: "B", x: 300, y: 150 },
        { id: 3, label: "C", x: 450, y: 150 },
        { id: 4, label: "D", x: 225, y: 250 },
        { id: 5, label: "E", x: 375, y: 250 },
        { id: 6, label: "F", x: 300, y: 350 },
      ];
    }

    return [
      { id: 1, label: "A", x: 200, y: 150 },
      { id: 2, label: "B", x: 400, y: 150 },
      { id: 3, label: "C", x: 600, y: 150 },
      { id: 4, label: "D", x: 300, y: 300 },
      { id: 5, label: "E", x: 500, y: 300 },
      { id: 6, label: "F", x: 400, y: 450 },
    ];
  };

  const demoSteps = [
    {
      title: "Topic Analysis",
      content: "Breaking down 'Machine Learning' into core concepts...",
      nodes: getNodePositions()
    },
    {
      title: "Path Generation",
      content: "Creating optimal learning sequence...",
      nodes: getNodePositions().map(node => ({ ...node, connected: true }))
    },
    {
      title: "Knowledge Map",
      content: "Your personalized learning path is ready!",
      nodes: getNodePositions().map(node => ({ 
        ...node, 
        connected: true,
        active: node.id === 2
      }))
    }
  ];

  // Typing animation
  useEffect(() => {
    if (typedText.length < demoTopic.length) {
      const timeout = setTimeout(() => {
        setTypedText(demoTopic.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setIsAnalyzing(true);
        setShowNodes(true);
        startDemoSequence();
      }, 1000);
    }
  }, [typedText]);

  const startDemoSequence = () => {
    setTimeout(() => {
      setIsAnalyzing(false);
      const interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= 2) {
            setTimeout(() => {
              setTypedText("");
              setIsAnalyzing(false);
              setShowNodes(false);
              setCurrentStep(0);
            }, 2000);
            clearInterval(interval);
          }
          return prev < 2 ? prev + 1 : prev;
        });
      }, 3000);
    }, 2000);
  };

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setCurrentStep(prev => {
        const nodes = getNodePositions();
        demoSteps[0].nodes = nodes;
        demoSteps[1].nodes = nodes.map(node => ({ ...node, connected: true }));
        demoSteps[2].nodes = nodes.map(node => ({ 
          ...node, 
          connected: true,
          active: node.id === 2
        }));
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        minHeight: { xs: 'auto', md: '100vh' },
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: { xs: 4, md: 8 },
          mb: 4,
        }}
      >
        {/* Left side - Title */}
        <Box
          sx={{
            flex: '1',
            maxWidth: { xs: '100%', md: '400px' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            level="h2"
            sx={{
              fontSize: { xs: '1.75rem', sm: '2rem', md: '3rem' },
              background: 'linear-gradient(45deg, #fff 20%, #9C27B0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            See Flow in Action
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Watch as Flow analyzes your topic and creates a personalized learning path, mapping connections between key concepts.
          </Typography>
        </Box>

        {/* Right side - Input and Description */}
        <Box
          sx={{
            flex: '1',
            width: '100%',
            maxWidth: { xs: '100%', md: '500px' },
          }}
        >
          {/* Input area */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '50px', md: '60px' },
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              border: '2px solid rgba(156,39,176,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 2,
            }}
          >
            {typedText}
            <Box
              sx={{
                width: '2px',
                height: '24px',
                background: '#9C27B0',
                ml: 0.5,
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 0 },
                  '50%': { opacity: 1 },
                },
              }}
            />
          </Box>

          {/* Description below input */}
          <Typography
            level="body-md"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '0.9rem', md: '1rem' },
            }}
          >
            {isAnalyzing ? "Analyzing topic structure..." : 
             showNodes ? demoSteps[currentStep].content :
             "Watch as Flow breaks down complex topics into interconnected concepts"}
          </Typography>
        </Box>
      </Box>

      {/* Visualization area */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: '400px', sm: '500px', md: '600px' },
          position: 'relative',
          mt: 4,
        }}
      >
        {showNodes && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: '400px', sm: '500px', md: '600px' },
            }}
          >
            {isAnalyzing ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: '36px', md: '48px' },
                    height: { xs: '36px', md: '48px' },
                    border: '3px solid rgba(156,39,176,0.2)',
                    borderTop: '3px solid #9C27B0',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' },
                    },
                  }}
                />
              </Box>
            ) : (
              <>
                {/* Connecting lines */}
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                >
                  {currentStep > 0 && demoSteps[currentStep].nodes.map((node, index, array) => {
                    const connections = [
                      [0, 1], [1, 2], // Top row
                      [3, 4], // Middle row
                      [0, 3], [1, 4], [2, 4], // Diagonal connections
                      [3, 5], [4, 5], // Bottom connections
                    ];
                    
                    return connections.map(([fromIndex, toIndex]) => {
                      if (index === fromIndex) {
                        const toNode = array[toIndex];
                        return (
                          <line
                            key={`line-${node.id}-${toNode.id}`}
                            x1={node.x}
                            y1={node.y}
                            x2={toNode.x}
                            y2={toNode.y}
                            stroke={node.connected ? '#9C27B0' : 'rgba(156,39,176,0.2)'}
                            strokeWidth={2}
                            strokeDasharray={node.connected ? 'none' : '4'}
                          />
                        );
                      }
                      return null;
                    });
                  })}
                </svg>

                {/* Nodes */}
                {demoSteps[currentStep].nodes.map((node: Node) => (
                  <Box
                    key={node.id}
                    sx={{
                      position: 'absolute',
                      left: `${node.x}px`,
                      top: `${node.y}px`,
                      width: { xs: '40px', md: '50px' },
                      height: { xs: '40px', md: '50px' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: node.active
                        ? 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)'
                        : 'rgba(156,39,176,0.1)',
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: node.connected ? '#9C27B0' : 'rgba(156,39,176,0.3)',
                      color: 'white',
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      transform: `translate(-50%, -50%) ${node.active ? 'scale(1.1)' : 'scale(1)'}`,
                      boxShadow: node.active
                        ? '0 0 20px rgba(156,39,176,0.3)'
                        : 'none',
                      zIndex: 1,
                    }}
                  >
                    {node.label}
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default InteractiveDemo; 