import { Alert, AlertProps } from '@mui/joy';
import { useEffect, useState } from 'react';

interface CustomAlertProps extends AlertProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const CustomAlert = ({ message, duration = 5000, onClose, color = 'danger', ...props }: CustomAlertProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!show) return null;

  return (
    <Alert
      variant="soft"
      color={color}
      sx={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out',
        backgroundColor: color === 'danger' 
          ? 'rgba(211, 47, 47, 0.1)' 
          : color === 'success'
          ? 'rgba(46, 125, 50, 0.1)'
          : 'rgba(156, 39, 176, 0.1)',
        borderColor: color === 'danger'
          ? 'rgba(211, 47, 47, 0.3)'
          : color === 'success'
          ? 'rgba(46, 125, 50, 0.3)'
          : 'rgba(156, 39, 176, 0.3)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
      {...props}
    >
      {message}
    </Alert>
  );
};

export default CustomAlert;