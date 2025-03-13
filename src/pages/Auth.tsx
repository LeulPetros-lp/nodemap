import {
  Box,
  Button,
  Container,
  Typography,
  Input,
  Divider,
  Alert,
  Sheet,
  IconButton
} from '@mui/joy';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// CustomAlert import removed

const FlowIcon = () => (
  <svg
    width="72"
    height="57"
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


const Auth = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, currentUser, error } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/create');
    }
  }, [currentUser, navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: { xs: '85vh', sm: '90vh', md: '95vh' },
        gap: 3,
        px: { xs: 2, sm: 3, md: 4 },
        pt: { xs: 8, sm: 0 },
      }}
    >
      <Sheet
        sx={{
          width: '100%',
          maxWidth: '500px',
          borderRadius: 'lg',
          p: { xs: 3, sm: 4, md: 5 },
          background: 'transparent',
          transform: 'translateY(2rem)',
          '@media (max-height: 700px)': {
            transform: 'translateY(1rem)',
          },
        }}
      >
        <Typography
          level="h2"
          sx={{
            mb: { xs: 3, sm: 4 },
            textAlign: 'center',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'white', // Changed from gradient to white
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2, // Add space between icon and text
              positon: 'relative',
              right: 200
            }}
          >
            <FlowIcon />
            <Typography
              level="h2"
              sx={{
                fontSize: 'inherit',
                fontWeight: 'inherit',
                color: 'inherit',
              }}
            >
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Typography>
          </Box>
        </Typography>

        {error && (
          <Alert
            variant="soft"
            color="danger"
            sx={{
              width: '100%',
              mb: 3,
              animation: 'fadeIn 0.3s ease-out',
              backgroundColor: 'rgba(156, 39, 176, 0.1)', // Light purple background
              color: 'rgba(255, 255, 255, 0.9)', // Whitish text
              border: '1px solid rgba(156, 39, 176, 0.2)', // Light purple border
              '& .MuiAlert-message': {
                color: 'rgba(255, 255, 255, 0.9)', // Ensuring text is whitish
              },
              '@keyframes fadeIn': {
                from: {
                  opacity: 0,
                },
                to: {
                  opacity: 1,
                },
              },
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleEmailAuth} style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '--Input-focusedThickness': '2px',
                '--Input-focusedHighlight': '#9C27B0',
                '--Input-radius': '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '1.1rem',
                p: 1.5,
                '&:hover': {
                  borderColor: 'rgba(156, 39, 176, 0.3)',
                },
                '& input': {
                  color: 'white',  // Added this to make input text white
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 0.7,
                  },
                },
              }}
            />
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '--Input-focusedThickness': '2px',
                '--Input-focusedHighlight': '#9C27B0',
                '--Input-radius': '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '1.1rem',
                p: 1.5,
                '&:hover': {
                  borderColor: 'rgba(156, 39, 176, 0.3)',
                },
                '& input': {
                  color: 'white',  // Added this to make input text white
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    opacity: 0.7,
                  },
                },
              }}
            />
            <Button
              type="submit"
              sx={{
                background: 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)',
                color: 'white',
                fontWeight: 600,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s',
              }}
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </Box>
        </form>

        <Box sx={{ position: 'relative', my: 4 }}>
          <Divider sx={{
            '&::before, &::after': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}>
            <Typography level="body-md" sx={{ px: 2, color: 'rgba(255, 255, 255, 0.5)' }}>
              OR
            </Typography>
          </Divider>
        </Box>

        <Button
          variant="outlined"
          color="neutral"
          onClick={signInWithGoogle}
          sx={{
            width: '100%',
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 500,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            backgroundColor: 'white',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s',
          }}
        >
          <img
            src="/google-icon.svg"
            alt="Google"
            style={{ width: '24px', height: '24px' }}
          />
          Continue with Google
        </Button>

        <Button
          variant="plain"
          color="neutral"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{
            mt: 4,
            width: '100%',
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#9C27B0',
              backgroundColor: 'transparent',
            }
          }}
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : 'Need an account? Sign Up'}
        </Button>
      </Sheet>
    </Container>
  );
};

export default Auth; 
