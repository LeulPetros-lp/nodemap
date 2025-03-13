import { Box, Button, Container, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ScrollIndicator = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: { xs: '20px', md: '40px' },
      left: '50%',
      transform: 'translateX(-50%)',
      display: { xs: 'none', md: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      animation: 'fadeInUp 1s ease-out',
      '@keyframes fadeInUp': {
        '0%': {
          opacity: 0,
          transform: 'translate(-50%, 20px)',
        },
        '100%': {
          opacity: 1,
          transform: 'translate(-50%, 0)',
        },
      },
    }}
  >
    {/* <Typography
      level="body-sm"
      sx={{
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontSize: '0.85rem',
        fontWeight: 500,
      }}
    >
      Discover Your Path
    </Typography> */}
   
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mt: 1,
      }}
    >
      {[0, 1, 2].map((dot) => (
        <Box
          key={dot}
          sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#9C27B0',
            opacity: 0.5,
            animation: 'fadeInOut 2s infinite',
            animationDelay: `${dot * 0.3}s`,
            '@keyframes fadeInOut': {
              '0%, 100%': { opacity: 0.2 },
              '50%': { opacity: 0.8 },
            },
          }}
        />
      ))}
    </Box>
  </Box>
);

const Hero = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleStartMapping = () => {
    if (currentUser) {
      navigate('/create');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: '80px', md: 0 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at top right, #9C27B0 0%, transparent 50%)',
          opacity: 0.15,
        },
      }}
    >
      <Container
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
          textAlign: 'center',
          position: 'relative',
          gap: { xs: 3, md: 4 },
          pt: { xs: 4, md: 0 },
        }}
      >
        <Box sx={{ position: 'relative', mb: { xs: 1, md: 2 } }}>
          <Typography
            component="span"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              color: 'rgba(255,255,255,0.9)',
              display: 'block',
              mb: { xs: 1, md: 2 },
            }}
          >
            AI-Powered Learning Paths
          </Typography>
          <Typography
            level="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '6rem' },
              fontWeight: '800',
              background: 'linear-gradient(45deg, #fff 20%, #9C27B0 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              mb: { xs: 2, md: 1 },
            }}
          >
            Learn • Flow • Grow
          </Typography>
        </Box>
        
        <Typography
          level="h3"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            maxWidth: '600px',
            mb: { xs: 3, md: 4 },
            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
            fontWeight: '400',
            lineHeight: 1.6,
            px: { xs: 2, md: 0 },
          }}
        >
          Discover personalized learning paths with AI that maps your brain's natural flow
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            gap: { xs: 2, md: 3 }, 
            flexWrap: 'wrap', 
            justifyContent: 'center',
            width: '100%',
            px: { xs: 2, md: 0 },
          }}
        >
          <Button
            size="lg"
            variant="solid"
            onClick={handleStartMapping}
            sx={{
              background: 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)',
              color: 'white',
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              minWidth: { xs: '140px', sm: 'auto' },
              '&:hover': {
                background: 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)',
                transform: 'translateY(-2px)',
              },
              transition: 'transform 0.2s',
            }}
          >
            Start Mapping
          </Button>
          <Button
            size="lg"
            variant="outlined"
            sx={{
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              fontSize: { xs: '1rem', md: '1.125rem' },
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              flex: { xs: '1 1 auto', sm: '0 1 auto' },
              minWidth: { xs: '140px', sm: 'auto' },
              '&:hover': {
                borderColor: '#9C27B0',
                color: '#9C27B0',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s',
            }}
          >
            See Examples
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 3, md: 6 },
            mt: { xs: 6, md: 8 },
            px: { xs: 2, md: 2 },
            width: '100%',
            maxWidth: '800px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {['AI Analysis', 'Custom Pathways', 'Brain Mapping'].map((feature) => (
            <Typography
              key={feature}
              sx={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: { xs: '0.875rem', md: '1rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                whiteSpace: 'nowrap',
                '&::before': {
                  content: '""',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#9C27B0',
                },
              }}
            >
              {feature}
            </Typography>
          ))}
        </Box>
      </Container>
      <ScrollIndicator />
    </Box>
  );
};

export default Hero; 