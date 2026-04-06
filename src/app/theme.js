import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C331F',
    },
    secondary: {
      main: '#475F2B',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
