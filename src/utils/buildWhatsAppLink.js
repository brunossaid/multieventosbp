import dayjs from 'dayjs';
import { ALL_SCHEDULES } from '../constants/ALL_SCHEDULES';

export function buildWhatsAppLink({
  selectedDate,
  selectedSchedule,
  guestCount,
}) {
  const schedule = ALL_SCHEDULES.find((item) => item.id === selectedSchedule);

  // dia + fecha
  const formattedDate = selectedDate
    ? dayjs(selectedDate)
        .format('dddd DD/MM/YY')
        .replace(/^./, (c) => c.toUpperCase())
    : '';

  // cantidad de personas
  const formattedGuests = guestCount ? `Hasta ${guestCount} personas` : '';

  const message = `Hola! Quisiera consultar por el salon Multieventos BP.
- Fecha: ${formattedDate}
- Horario: ${schedule.label}
- Cantidad: ${formattedGuests}`;

  const phone = '5491163045437';

  // console.log('message', message);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
