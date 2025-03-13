import { Modal, ModalClose, Box, Typography } from '@mui/joy';
import ArchiveVideoPreview from './ArchiveVideoPreview';

interface VideoPreviewModalProps {
  open: boolean;
  onClose: () => void;
  resource: {
    identifier: string;
    title: string;
  } | null;
}

const VideoPreviewModal = ({ open, onClose, resource }: VideoPreviewModalProps) => {
  if (!resource) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '90vw',
          maxWidth: '900px',
          bgcolor: 'rgba(0, 0, 0, 0.95)',
          borderRadius: '12px',
          p: 3,
          border: '1px solid rgba(156, 39, 176, 0.3)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography level="h4" sx={{ color: 'white' }}>
            {resource.title}
          </Typography>
          <ModalClose 
            sx={{ 
              color: 'white',
              '&:hover': { 
                bgcolor: 'rgba(156, 39, 176, 0.2)' 
              } 
            }} 
          />
        </Box>
        <ArchiveVideoPreview 
          identifier={resource.identifier}
          title={resource.title}
        />
      </Box>
    </Modal>
  );
};

export default VideoPreviewModal;