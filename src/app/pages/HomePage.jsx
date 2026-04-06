import * as React from 'react';
import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ImageCarousel from '../../components/ImageCarousel';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { buildWhatsAppLink } from '../../utils/buildWhatsAppLink';
import { ALL_SCHEDULES } from '../../constants/ALL_SCHEDULES';

export default function HomePage() {
  // fecha y horario
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState('');

  const availableSchedules = useMemo(() => {
    if (!selectedDate) return [];

    const dayOfWeek = selectedDate.day();
    return ALL_SCHEDULES.filter((schedule) =>
      schedule.validDays.includes(dayOfWeek)
    );
  }, [selectedDate]);

  // cantidad de personas
  const [guestCount, setGuestCount] = React.useState('');
  const handleChange = (event) => {
    setGuestCount(event.target.value);
  };

  // boton
  const isFormComplete = selectedDate && selectedSchedule && guestCount;

  // whatsapp
  const handleWhatsAppClick = () => {
    if (!selectedDate || !selectedSchedule || !guestCount) return;

    const url = buildWhatsAppLink({
      selectedDate,
      selectedSchedule,
      guestCount,
    });

    window.open(url, '_blank');
  };

  return (
    <>
      <ImageCarousel height={340} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={550} color={'grey.800'}>
          Datos del evento
        </Typography>

        <DatePicker
          label="Fecha del evento"
          format="DD/MM/YYYY"
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            setSelectedSchedule('');
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              fullWidth: true,
            },
          }}
        />

        <TextField
          select
          label="Horario"
          variant="outlined"
          fullWidth
          value={selectedSchedule}
          onChange={(e) => setSelectedSchedule(e.target.value)}
          disabled={!selectedDate}
          helperText={
            !selectedDate
              ? 'Primero seleccioná una fecha'
              : availableSchedules.length === 0
                ? 'No hay horarios disponibles para ese día'
                : ''
          }
          slotProps={{
            select: {
              renderValue: (selected) => {
                const option = ALL_SCHEDULES.find(
                  (item) => item.id === selected
                );
                return option ? `${option.shortDay} · ${option.label}` : '';
              },
            },
          }}
        >
          {availableSchedules.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <ListItemText
                primary={option.label}
                secondary={option.description}
              />
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth>
          <InputLabel>Cantidad de Personas</InputLabel>
          <Select
            value={guestCount}
            label="Cantidad de Personas"
            onChange={handleChange}
          >
            <MenuItem value={50}>Hasta 50</MenuItem>
            <MenuItem value={70}>Hasta 70</MenuItem>
            <MenuItem value={80}>Hasta 80</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{
            height: 56,
          }}
          onClick={handleWhatsAppClick}
          disabled={!isFormComplete}
        >
          <WhatsAppIcon sx={{ mr: 1 }} />
          Enviar consulta
        </Button>
      </Box>
    </>
  );
}
