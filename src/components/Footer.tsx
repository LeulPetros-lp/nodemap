import { Box, Container, Typography, Link } from '@mui/joy';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography level="body-sm" sx={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2024 Nodemap. All rights reserved.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          {['About', 'Privacy', 'Terms', 'Contact'].map((item) => (
            <Link
              key={item}
              href="#"
              level="body-sm"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                '&:hover': {
                  color: '#fff',
                },
              }}
            >
              {item}
            </Link>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 