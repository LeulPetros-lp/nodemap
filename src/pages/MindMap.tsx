import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface MindMapNode {
  id: string;
  label: string;
  description: string;
  children?: MindMapNode[];
  x?: number;
  y?: number;
}

const MindMap = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('learningResponse');
    if (!savedData) {
      navigate('/create');
      return;
    }

    try {
      const { nodes: linearNodes } = JSON.parse(savedData);
      
      // Convert linear nodes to hierarchical structure
      const rootNode = {
        id: '1',
        label: linearNodes[0].label,
        description: linearNodes[0].description,
        children: linearNodes.slice(1).map((node: any) => ({
          id: node.id.toString(),
          label: node.label,
          description: node.description,
          children: node.details.keyPoints.map((point: string, idx: number) => ({
            id: `${node.id}.${idx}`,
            label: point,
            description: ''
          }))
        }))
      };

      setNodes([rootNode]);
    } catch (error) {
      console.error('Error processing mind map data:', error);
      navigate('/create');
    }
  }, [navigate]);

  const calculateNodePositions = (node: MindMapNode, centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    if (!node.children?.length) return;

    const angleStep = (endAngle - startAngle) / node.children.length;
    
    node.children.forEach((child, index) => {
      const angle = startAngle + (index * angleStep) + (angleStep / 2);
      child.x = centerX + radius * Math.cos(angle);
      child.y = centerY + radius * Math.sin(angle);
      
      // Calculate positions for grandchildren
      if (child.children?.length) {
        calculateNodePositions(
          child,
          child.x,
          child.y,
          radius * 0.7,
          angle - Math.PI / 3,
          angle + Math.PI / 3
        );
      }
    });
  };

  useEffect(() => {
    if (nodes.length > 0) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rootNode = nodes[0];
      rootNode.x = centerX;
      rootNode.y = centerY;
      
      calculateNodePositions(rootNode, centerX, centerY, 200, 0, 2 * Math.PI);
      setNodes([...nodes]);
    }
  }, [nodes.length]);

  const renderConnections = (node: MindMapNode) => {
    if (!node.children?.length) return null;

    return node.children.map(child => (
      <g key={`connection-${node.id}-${child.id}`}>
        <path
          d={`M ${node.x} ${node.y} Q ${(node.x + child.x) / 2} ${(node.y + child.y) / 2} ${child.x} ${child.y}`}
          fill="none"
          stroke="rgba(156, 39, 176, 0.5)"
          strokeWidth={2}
        />
        {renderConnections(child)}
      </g>
    ));
  };

  const renderNodes = (node: MindMapNode) => {
    return (
      <g key={`node-${node.id}`}>
        <circle
          cx={node.x}
          cy={node.y}
          r={node.id === '1' ? 60 : 40}
          fill={node.id === '1' ? '#9C27B0' : '#7B1FA2'}
          opacity={0.9}
          cursor="pointer"
          onClick={() => setSelectedNode(node)}
        />
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={node.id === '1' ? 14 : 12}
          cursor="pointer"
          onClick={() => setSelectedNode(node)}
        >
          {node.label.slice(0, 20)}
        </text>
        {node.children?.map(child => renderNodes(child))}
      </g>
    );
  };

  if (!nodes.length) return null;

  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        {renderConnections(nodes[0])}
        {renderNodes(nodes[0])}
      </svg>
      
      {selectedNode && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            padding: 3,
            borderRadius: 2,
            maxWidth: '80%'
          }}
        >
          <Typography level="h4">{selectedNode.label}</Typography>
          <Typography>{selectedNode.description}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default MindMap;