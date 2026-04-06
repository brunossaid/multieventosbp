import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es';
import { esES } from '@mui/x-date-pickers/locales';
import AppBarX from '../components/AppBarX';
import HomePage from './pages/HomePage';
import Footer from '../components/Footer';
import { appBackground } from './background';

export default function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="es"
      localeText={
        esES.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Box
        sx={{
          ...appBackground,
          minHeight: '100dvh',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 'sm',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            backgroundColor: 'white',
          }}
        >
          <AppBarX />

          <Box sx={{ flex: 1 }}>
            <HomePage />
          </Box>

          <Footer />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
