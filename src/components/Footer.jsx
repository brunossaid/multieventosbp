import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        textAlign: 'center',
        opacity: 0.6,
        bgcolor: '#c4c1ba',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Multieventos Barrio Parque
      </Typography>
    </Box>
  );
}
