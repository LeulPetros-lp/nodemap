import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  level: number;
}

interface Connection {
  from: string;
  to: string;
}

const InteractiveMindMap = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('learningResponse');
    if (!savedData) {
      navigate('/create');
      return;
    }

    try {
      const { mindmap } = JSON.parse(savedData);
      const processedNodes: Node[] = [];
      const processedConnections: Connection[] = [];

      // Process root node
      processedNodes.push({
        id: mindmap.rootNode.id,
        label: mindmap.rootNode.label,
        x: 0,
        y: 0,
        level: 0
      });

      // Process other nodes and connections
      mindmap.nodes.forEach((node: any, index: number) => {
        const angle = (2 * Math.PI * index) / mindmap.nodes.length;
        const radius = 300; // Adjust this value to change the circle size

        processedNodes.push({
          id: node.id,
          label: node.label,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          level: 1
        });

        // Connect to root
        processedConnections.push({
          from: mindmap.rootNode.id,
          to: node.id
        });

        // Process subnodes
        if (node.subNodes) {
          node.subNodes.forEach((subNode: any, subIndex: number) => {
            const subAngle = angle + (subIndex - (node.subNodes.length - 1) / 2) * 0.5;
            const subRadius = radius + 150;

            processedNodes.push({
              id: subNode.id,
              label: subNode.label,
              x: Math.cos(subAngle) * subRadius,
              y: Math.sin(subAngle) * subRadius,
              level: 2
            });

            processedConnections.push({
              from: node.id,
              to: subNode.id
            });
          });
        }
      });

      setNodes(processedNodes);
      setConnections(processedConnections);
    } catch (error) {
      console.error('Failed to process mindmap data:', error);
    }
  }, [navigate]);

  const renderConnections = () => (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {connections.map((connection, index) => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        if (!fromNode || !toNode) return null;

        const centerX = containerRef.current?.clientWidth ?? 0;
        const centerY = containerRef.current?.clientHeight ?? 0;

        return (
          <line
            key={index}
            x1={centerX / 2 + fromNode.x}
            y1={centerY / 2 + fromNode.y}
            x2={centerX / 2 + toNode.x}
            y2={centerY / 2 + toNode.y}
            stroke="rgba(156, 39, 176, 0.4)"
            strokeWidth={2}
          />
        );
      })}
    </svg>
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        bgcolor: 'transparent',
        overflow: 'hidden'
      }}
    >
      {renderConnections()}
      {nodes.map((node) => {
        const centerX = containerRef.current?.clientWidth ?? 0;
        const centerY = containerRef.current?.clientHeight ?? 0;

        return (
          <Box
            key={node.id}
            sx={{
              position: 'absolute',
              left: centerX / 2 + node.x - 75,
              top: centerY / 2 + node.y - 30,
              width: 150,
              padding: 2,
              bgcolor: node.level === 0 
                ? 'rgba(156, 39, 176, 0.2)'
                : 'rgba(0, 0, 0, 0.3)',
              border: `1px solid ${
                node.level === 0 
                  ? 'rgba(156, 39, 176, 0.5)'
                  : 'rgba(255, 255, 255, 0.1)'
              }`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'rgba(156, 39, 176, 0.3)',
                zIndex: 1
              }
            }}
            onClick={() => setSelectedNode(node.id)}
          >
            <Typography
              level="body-sm"
              sx={{
                color: 'white',
                textAlign: 'center',
                fontSize: node.level === 0 ? '1rem' : '0.875rem'
              }}
            >
              {node.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default InteractiveMindMap;