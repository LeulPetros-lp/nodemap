import { Box, Typography, Card } from '@mui/joy';
import { useMemo } from 'react';

const steps = [
  {
    number: '01',
    title: 'Input Your Topic',
    description: 'Tell us what you want to learn or understand better',
    icon: '🎯',
    iconDescription: 'Target icon representing focused learning goal',
    status: 'active'
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Our AI analyzes your topic and breaks it down into key concepts',
    icon: '🔍',
    iconDescription: 'Magnifying glass representing deep analysis',
    status: 'next'
  },
  {
    number: '03',
    title: 'Path Generation',
    description: 'Creates a personalized learning path based on cognitive science',
    icon: '🧭',
    iconDescription: 'Compass representing guided learning journey',
    status: 'upcoming'
  },
  {
    number: '04',
    title: 'Visual Mapping',
    description: 'Visualizes connections between concepts for better understanding',
    icon: '🌐',
    iconDescription: 'Network globe representing interconnected concepts',
    status: 'upcoming'
  },
  {
    number: '05',
    title: 'Learning Flow',
    description: 'Follow your custom path and track your progress naturally',
    icon: '⭐',
    iconDescription: 'Star representing achievement and progress',
    status: 'upcoming'
  }
];

const StepPreview = () => {
  // Generate balanced random positions (exactly 3 left, 2 right)
  const randomPositions = useMemo(() => {
    const positions = new Array(5).fill(false);
    const rightIndices = new Set();
    
    // Randomly select 2 indices for right side
    while (rightIndices.size < 2) {
      const index = Math.floor(Math.random() * 5);
      rightIndices.add(index);
    }
    
    // Set those indices to true (right side)
    rightIndices.forEach(index => {
      positions[index] = true;
    });
    
    return positions;
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        pt: 12,
        pb: 6,
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'linear-gradient(180deg, #9C27B0 0%, rgba(156, 39, 176, 0.1) 100%)',
            zIndex: 0,
          }
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={step.number}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3,
              mb: 8,
              position: 'relative',
              transition: 'transform 0.3s ease',
              transform: `translateX(${randomPositions[index] ? '30px' : '-30px'})`,
              '&:hover': {
                transform: `translateX(${randomPositions[index] ? '35px' : '-35px'})`,
              }
            }}
          >
            {!randomPositions[index] && (
              <Card
                variant="outlined"
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  background: step.status === 'active'
                    ? 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0.05) 100%)'
                    : 'rgba(0,0,0,0.2)',
                  borderColor: step.status === 'active' ? 'rgba(156,39,176,0.3)' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  p: 3,
                  position: 'relative',
                  '&:hover': {
                    borderColor: '#9C27B0',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(156,39,176,0.15)',
                  }
                }}
              >
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    level="body-xs"
                    sx={{
                      color: step.status === 'active' ? '#9C27B0' : 'rgba(255,255,255,0.5)',
                      mb: 1,
                    }}
                  >
                    STEP {step.number}
                  </Typography>
                  <Typography
                    level="h4"
                    sx={{
                      color: step.status === 'active' ? 'white' : 'rgba(255,255,255,0.8)',
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Card>
            )}

            <Box
              sx={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: step.status === 'active' 
                  ? 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)'
                  : 'rgba(156, 39, 176, 0.1)',
                border: '2px solid',
                borderColor: step.status === 'active' ? '#9C27B0' : 'rgba(156, 39, 176, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                color: step.status === 'active' ? 'white' : 'rgba(255,255,255,0.5)',
                flexShrink: 0,
                zIndex: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 20px rgba(156,39,176,0.3)',
                }
              }}
            >
              {step.icon}
            </Box>

            {randomPositions[index] && (
              <Card
                variant="outlined"
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  background: step.status === 'active'
                    ? 'linear-gradient(135deg, rgba(156,39,176,0.1) 0%, rgba(156,39,176,0.05) 100%)'
                    : 'rgba(0,0,0,0.2)',
                  borderColor: step.status === 'active' ? 'rgba(156,39,176,0.3)' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  p: 3,
                  position: 'relative',
                  '&:hover': {
                    borderColor: '#9C27B0',
                    transform: 'scale(1.02)',
                    boxShadow: '0 4px 20px rgba(156,39,176,0.15)',
                  }
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    level="body-xs"
                    sx={{
                      color: step.status === 'active' ? '#9C27B0' : 'rgba(255,255,255,0.5)',
                      mb: 1,
                    }}
                  >
                    STEP {step.number}
                  </Typography>
                  <Typography
                    level="h4"
                    sx={{
                      color: step.status === 'active' ? 'white' : 'rgba(255,255,255,0.8)',
                      mb: 1,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Card>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StepPreview; 