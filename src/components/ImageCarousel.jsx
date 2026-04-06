import { useEffect, useMemo, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ImageCarousel({
  autoPlay = true,
  interval = 4000,
  height = 320,
}) {
  const images = useMemo(() => {
    const imageModules = import.meta.glob(
      '../assets/images/*.{png,jpg,jpeg,webp}',
      {
        eager: true,
        import: 'default',
      }
    );

    return Object.values(imageModules);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {images.length > 1 && (
        <>
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 12,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)',
              color: 'white',
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={goToNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 12,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)',
              color: 'white',
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Box>
  );
}
