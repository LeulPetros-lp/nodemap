import { Box, Button, IconButton, Typography, Modal, Sheet } from '@mui/joy';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
        values="M2 8C2 8 4 6 6 6C8 6 8.5 8 10 8C11.5 8 12 6 14 6C16 6 16.5 8 18 8C19.5 8 20 6 22 6;
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
    />
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

type MenuItem = {
  label: string;
  variant?: 'plain' | 'solid' | 'soft' | 'outlined';
  isButton?: boolean;
  onClick?: () => void;
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems: MenuItem[] = currentUser 
    ? [
        { 
          label: 'Logout', 
          isButton: true, // Changed to true to make it a button
          variant: 'soft', // Added variant for consistent styling
          onClick: handleLogout 
        },
        { 
          label: 'Create Path',
          variant: 'solid',  // Changed from 'outlined' to 'solid'
          isButton: true,
          onClick: () => navigate('/create')
        }
      ]
    : [
        { label: 'About', isButton: false },
        { 
          label: 'Try Demo', 
          variant: 'solid', 
          isButton: true,
          onClick: () => navigate('/signup')
        }
      ];

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4, md: 8 },
          py: { xs: 2, sm: 3, md: 4 },
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography
          level="h4"
          sx={{
            fontWeight: '500',
            letterSpacing: '-0.5px',
            fontSize: { xs: '2rem', sm: '2.3rem', md: '2.6rem' },
            display: 'flex',
            alignItems: 'center',
            fontFamily: "'Poppins', sans-serif",
            color: 'white',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '4px',
              left: '52px',
              width: '95px',
              height: '2px',
              background: 'linear-gradient(90deg, #9C27B0, transparent)',
              animation: 'flowLine 2s infinite',
            },
            '@keyframes flowLine': {
              '0%': {
                width: '95px',
                opacity: 0.5,
              },
              '50%': {
                width: '120px',
                opacity: 0.8,
              },
              '100%': {
                width: '95px',
                opacity: 0.5,
              },
            },
          }}
        >
          <a href='/' style={{ textDecoration: 'none' }}><FlowIcon /></a>
          <Box 
            component="span" 
            sx={{ 
              background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px'
            }}
          >
               <a href='/' style={{ textDecoration: 'none' }}>nodemap</a>
          </Box>
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, alignItems: 'center' }}>
          {menuItems.map((item) => (
            item.isButton ? (
              <Button 
                key={item.label}
                variant={item.variant} 
                size="lg"
                onClick={item.onClick}
                sx={{ 
                  color: 'white',
                  fontSize: '1.1rem',
                  px: 4,
                  background: item.variant === 'solid' 
                    ? 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)'
                    : item.variant === 'soft'
                      ? 'rgba(255, 255, 255, 0.1)'  // Semi-transparent background for logout
                      : 'transparent',
                  '&:hover': {
                    background: item.variant === 'solid'
                      ? 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)'
                      : item.variant === 'soft'
                        ? 'rgba(255, 255, 255, 0.15)'  // Slightly lighter on hover for logout
                        : 'transparent',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </Button>
            ) : (
              <Typography
                key={item.label}
                level="body-lg"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'rgba(255,255,255,1)',
                  }
                }}
              >
                {item.label}
              </Typography>
            )
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          size="lg"
          onClick={() => setMobileMenuOpen(true)}
          sx={{ 
            display: { xs: 'flex', md: 'none' },
            color: 'white',
            fontSize: '1.5rem'
          }}
          variant="plain"
        >
          ☰
        </IconButton>
      </Box>

      {/* Mobile Menu Modal */}
      <Modal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'flex-start',
        }}
      >
        <Sheet
          sx={{
            width: '100%',
            minHeight: '100dvh',
            borderRadius: 0,
            p: 4,
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <IconButton
            size="lg"
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
              fontSize: '1.5rem'
            }}
            variant="plain"
          >
            ✕
          </IconButton>

          {menuItems.map((item, index) => (
            item.isButton ? (
              <Button
                key={item.label}
                variant={item.variant}
                size="lg"
                onClick={() => {
                  setMobileMenuOpen(false);
                  item.onClick?.();
                }}
                sx={{
                  width: '80%',
                  maxWidth: '300px',
                  color: 'white',
                  fontSize: '1.2rem',
                  py: 2,
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'slideIn 0.3s forwards',
                  animationDelay: `${index * 0.1}s`,
                  background: item.variant === 'solid'
                    ? 'linear-gradient(45deg, #9C27B0 30%, #7B1FA2 90%)'
                    : item.variant === 'soft'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
                  '&:hover': {
                    background: item.variant === 'solid'
                      ? 'linear-gradient(45deg, #7B1FA2 30%, #6A1B9A 90%)'
                      : item.variant === 'soft'
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'transparent',
                    transform: 'translateY(-2px)',
                  },
                  '@keyframes slideIn': {
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            ) : (
              <Typography
                key={item.label}
                level="body-lg"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1.2rem',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'slideIn 0.3s forwards',
                  animationDelay: `${index * 0.1}s`,
                  '&:hover': {
                    color: 'rgba(255,255,255,1)',
                  },
                  '@keyframes slideIn': {
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                {item.label}
              </Typography>
            )
          ))}
        </Sheet>
      </Modal>
    </>
  );
};

export default Navbar; 
