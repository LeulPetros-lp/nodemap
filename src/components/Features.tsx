import { Box, Card, Container, Grid, Typography } from '@mui/joy';

const features = [
  {
    title: 'Smart Automation',
    description: 'Automate repetitive tasks and focus on what matters most',
    icon: '🤖',
  },
  {
    title: 'Real-time Collaboration',
    description: 'Work seamlessly with your team in real-time',
    icon: '👥',
  },
  {
    title: 'Advanced Analytics',
    description: 'Get insights into your productivity and team performance',
    icon: '📊',
  },
  {
    title: 'Customizable Workflows',
    description: 'Create workflows that match your unique process',
    icon: '⚡',
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      }}
    >
      <Container>
        <Typography
          level="h2"
          sx={{
            textAlign: 'center',
            mb: 8,
            background: 'linear-gradient(45deg, #fff 30%, #888 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Why Choose Flow?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid xs={12} sm={6} md={3} key={feature.title}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  background: 'linear-gradient(45deg, rgba(40,40,40,0.9) 0%, rgba(60,60,60,0.9) 100%)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Typography level="h1" sx={{ mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography level="h4" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography level="body-md" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features; 