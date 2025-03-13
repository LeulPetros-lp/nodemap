import { Box, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';

interface Node {
  id: number | string;
  label: string;
  x?: number;
  y?: number;
  type?: 'main' | 'sub';
}

const LearningPathVisualization = ({ data }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  useEffect(() => {
    // Process nodes and subnodes into a flat structure
    const processNodes = () => {
      const allNodes: Node[] = [];
      
      data.nodes.forEach((mainNode) => {
        // Add main node
        allNodes.push({
          ...mainNode,
          type: 'main'
        });
        
        // Add subnodes
        mainNode.details.subNodes.forEach((subNode) => {
          allNodes.push({
            ...subNode,
            type: 'sub'
          });
        });
      });
      
      return allNodes;
    };

    const calculatePositions = (nodes: Node[]) => {
      const mainNodes = nodes.filter(n => n.type === 'main');
      const subNodes = nodes.filter(n => n.type === 'sub');
      
      // Calculate main nodes positions in a spiral
      mainNodes.forEach((node, i) => {
        const angle = i * (2 * Math.PI) / mainNodes.length;
        const radius = 300; // Adjust based on your needs
        const spiralFactor = (i + 1) * 20; // Creates a spiral effect
        
        node.x = window.innerWidth/2 + (radius + spiralFactor) * Math.cos(angle);
        node.y = window.innerHeight/2 + (radius + spiralFactor) * Math.sin(angle);
      });
      
      // Calculate subnode positions around their parent nodes
      subNodes.forEach((node) => {
        const parentId = parseInt(node.id.toString().split('.')[0]);
        const parent = mainNodes.find(n => n.id === parentId);
        
        if (parent && parent.x && parent.y) {
          const angle = Math.random() * 2 * Math.PI;
          const radius = 100; // Distance from parent node
          
          node.x = parent.x + radius * Math.cos(angle);
          node.y = parent.y + radius * Math.sin(angle);
        }
      });
      
      return [...mainNodes, ...subNodes];
    };

    const processedNodes = processNodes();
    const positionedNodes = calculatePositions(processedNodes);
    setNodes(positionedNodes);
  }, [data]);

  const renderConnections = () => {
    return (
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {nodes.map((fromNode) => {
          if (fromNode.type === 'main') {
            // Connect to next main node
            const nextMainNode = nodes.find(n => 
              n.type === 'main' && n.id === (fromNode.id as number) + 1
            );
            
            // Connect to subnodes
            const subNodes = nodes.filter(n => 
              n.type === 'sub' && n.id.toString().startsWith(fromNode.id.toString() + '.')
            );
            
            return (
              <g key={`connections-${fromNode.id}`}>
                {nextMainNode && fromNode.x && nextMainNode.x && (
                  <path
                    d={`M ${fromNode.x} ${fromNode.y} Q ${(fromNode.x + nextMainNode.x)/2} ${(fromNode.y + nextMainNode.y)/2 - 50} ${nextMainNode.x} ${nextMainNode.y}`}
                    stroke="rgba(156, 39, 176, 0.4)"
                    strokeWidth="2"
                    fill="none"
                  />
                )}
                {subNodes.map(subNode => (
                  <path
                    key={`subconnection-${subNode.id}`}
                    d={`M ${fromNode.x} ${fromNode.y} L ${subNode.x} ${subNode.y}`}
                    stroke="rgba(156, 39, 176, 0.2)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    fill="none"
                  />
                ))}
              </g>
            );
          }
          return null;
        })}
      </svg>
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'auto' }}>
      {renderConnections()}
      
      {nodes.map((node) => (
        <Box
          key={node.id}
          sx={{
            position: 'absolute',
            left: node.x ? node.x - 50 : 0,
            top: node.y ? node.y - 25 : 0,
            width: node.type === 'main' ? '120px' : '100px',
            padding: '10px',
            backgroundColor: node.type === 'main' 
              ? 'rgba(156, 39, 176, 0.2)' 
              : 'rgba(156, 39, 176, 0.1)',
            border: `2px solid ${node.type === 'main' 
              ? 'rgba(156, 39, 176, 0.5)' 
              : 'rgba(156, 39, 176, 0.3)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
              zIndex: 1000,
              backgroundColor: 'rgba(156, 39, 176, 0.3)',
            }
          }}
          onClick={() => setSelectedNode(node)}
        >
          <Typography
            sx={{
              color: 'white',
              fontSize: node.type === 'main' ? '0.9rem' : '0.8rem',
              textAlign: 'center',
              fontWeight: node.type === 'main' ? 600 : 400,
            }}
          >
            {node.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LearningPathVisualization;
