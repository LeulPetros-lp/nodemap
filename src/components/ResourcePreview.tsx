import { Box, Card, Typography } from '@mui/joy';
import ArchiveVideoPreview from './ArchiveVideoPreview';

interface ResourcePreviewProps {
  resource: {
    type: string;
    title: string;
    identifier: string;
    metadata?: {
      mediaType?: string;
    };
  };
}

const ResourcePreview = ({ resource }: ResourcePreviewProps) => {
  const isVideo = resource.metadata?.mediaType === 'movies';

  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '450px', md: '600px' },
        bgcolor: 'rgba(0, 0, 0, 0.2)',
        p: 2,
      }}
    >
      <Typography level="h6" sx={{ mb: 2 }}>
        {resource.title}
      </Typography>
      
      {isVideo && (
        <Box sx={{ mb: 2 }}>
          <ArchiveVideoPreview 
            identifier={resource.identifier}
            title={resource.title}
          />
        </Box>
      )}
    </Card>
  );
};

export default ResourcePreview;