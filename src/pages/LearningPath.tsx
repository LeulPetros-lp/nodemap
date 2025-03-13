import { Box, Container, Typography, Card, Button, Stack, Alert } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface MindMapNode {
  id: string;
  label: string;
  description: string;
  difficulty?: string;
  estimatedHours?: number;
  resources?: {
    type: string;
    title: string;
    url?: string;
  }[];
  subNodes?: {
    id: string;
    label: string;
    description: string;
    prerequisites?: string[];
  }[];
}

interface MindMapData {
  mindmap: {
    rootNode: MindMapNode;
    nodes: MindMapNode[];
    connections: {
      from: string;
      to: string;
      relationship: string;
    }[];
  };
}

const LearningPath = () => {
  const navigate = useNavigate();
  const [mindMapData, setMindMapData] = useState<MindMapData | null>(null);
  const [alert, setAlert] = useState<{
    message: string;
    color: 'danger' | 'success' | 'primary';
    show: boolean;
  }>({
    message: '',
    color: 'danger',
    show: false,
  });

  const handleViewMindMap = () => {
    navigate('/mindmap');
  };

  useEffect(() => {
    const savedResponse = localStorage.getItem('learningResponse');
    if (savedResponse) {
      try {
        const parsed = JSON.parse(savedResponse);
        console.log('Parsed mindmap data:', parsed);
        setMindMapData(parsed);
      } catch (error) {
        console.error('Failed to parse mindmap data:', error);
        setAlert({
          show: true,
          message: 'Failed to load learning path data. Please try generating a new path.',
          color: 'danger'
        });
      }
    }
  }, []);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert(prev => ({ ...prev, show: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  if (!mindMapData) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', mt: 20}}>
        <Typography level="h3">No learning path found</Typography>
      </Box>
    );
  }

  const renderNode = (node: MindMapNode, isRoot: boolean = false) => (
    <Card
      key={node.id}
      sx={{
        mb: 2,
        backgroundColor: isRoot ? 'rgba(156, 39, 176, 0.1)' : 'rgba(0, 0, 0, 0.2)',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          backgroundColor: isRoot ? 'rgba(156, 39, 176, 0.2)' : 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <Typography
        level="h4"
        sx={{
          color: isRoot ? '#9C27B0' : 'white',
          mb: 1
        }}
      >
        {node.label}
      </Typography>
      <Typography
        level="body-md"
        sx={{
          color: 'rgba(255, 255, 255, 0.7)',
          mb: 2
        }}
      >
        {node.description}
      </Typography>

      {node.difficulty && (
        <Typography
          level="body-sm"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            mb: 1
          }}
        >
          Difficulty: {node.difficulty} • Estimated Hours: {node.estimatedHours}
        </Typography>
      )}

      {node.resources && node.resources.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography level="body-sm" sx={{ color: '#9C27B0', mb: 1 }}>
            Resources:
          </Typography>
          {node.resources.map((resource, idx) => (
            <Typography
              key={idx}
              level="body-sm"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'block',
                mb: 0.5
              }}
            >
              • {resource.title} ({resource.type})
            </Typography>
          ))}
        </Box>
      )}

      {node.subNodes && node.subNodes.length > 0 && (
        <Box sx={{ pl: 2, borderLeft: '2px solid rgba(156, 39, 176, 0.3)' }}>
          {node.subNodes.map((subNode) => (
            <Box
              key={subNode.id}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 1
              }}
            >
              <Typography level="body-lg" sx={{ color: 'white', mb: 0.5 }}>
                {subNode.label}
              </Typography>
              <Typography level="body-sm" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                {subNode.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      bgcolor: 'transparent',
      color: '#fff',
      pt: 8,
      pb: 8
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mt: 10 }}>
          {renderNode(mindMapData.mindmap.rootNode, true)}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
          {mindMapData.mindmap.nodes.map(node => renderNode(node))}
        </Box>
        
        {/* Add View Mind Map button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            size="lg"
            onClick={handleViewMindMap}
            sx={{
              background: 'transparent',
              border: '2px solid #9C27B0',
              color: 'white',
              '&:hover': {
                background: 'rgba(156, 39, 176, 0.1)',
                transform: 'translateY(-2px)',
              },
              transition: 'transform 0.2s',
            }}
          >
            View Visual Mind Map
          </Button>
        </Box>
      </Container>
      {alert.show && (
        <Alert
          variant="soft"
          color={alert.color}
          sx={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 9999,
            minWidth: '300px',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease-out',
            backgroundColor: 'rgba(156, 39, 176, 0.25)', // Increased opacity
            color: 'rgba(255, 255, 255, 0.95)', // More visible text
            border: '1px solid rgba(156, 39, 176, 0.5)', // More visible border
            boxShadow: '0 2px 12px rgba(156, 39, 176, 0.2)', // Added subtle glow
            '& .MuiAlert-message': {
              color: 'rgba(255, 255, 255, 0.95)', // More visible text
              fontWeight: 500, // Slightly bolder text
            },
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
        >
          {alert.message}
        </Alert>
      )}
    </Box>
  );
};

export default LearningPath;

