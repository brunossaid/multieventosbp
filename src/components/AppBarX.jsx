import { AppBar, Toolbar, Typography } from '@mui/material';
import multieventosbp from '../assets/multieventos-barrioparque.png';

export default function AppBarX() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <img
          src={multieventosbp}
          alt="Logo"
          style={{ height: 60, objectFit: 'contain', padding: '8px' }}
        />
      </Toolbar>
    </AppBar>
  );
}
