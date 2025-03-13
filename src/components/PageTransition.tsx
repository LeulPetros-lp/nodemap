import { Box, CircularProgress } from '@mui/joy';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location]);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'rgba(10, 10, 10, 0.97)', // Match your dark theme
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s',
      }}
    >
      <CircularProgress
        size="lg"
        variant="soft"
        sx={{
          '--CircularProgress-trackColor': 'rgba(156, 39, 176, 0.2)',
          '--CircularProgress-progressColor': '#9C27B0',
        }}
      />
    </Box>
  );
};

export default PageTransition;