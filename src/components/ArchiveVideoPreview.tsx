import { Box } from '@mui/joy';

interface ArchiveVideoPreviewProps {
  identifier: string;
  title?: string;
}

const ArchiveVideoPreview = ({ identifier, title }: ArchiveVideoPreviewProps) => {
  // Archive.org embeds follow this format
  const embedUrl = `https://archive.org/embed/${identifier}`;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(156, 39, 176, 0.3)',
      }}
    >
      <iframe
        src={embedUrl}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        allowFullScreen
        title={title || 'Archive.org Video'}
      />
    </Box>
  );
};

export default ArchiveVideoPreview;