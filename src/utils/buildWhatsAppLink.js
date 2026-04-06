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

  const path = window.location.pathname.toLowerCase();

  const phoneMap = {
    '/a': '5491164200805', // ana
    '/c': '5491158172054', // ceci
  };

  const phone = phoneMap[path] || phoneMap['/c'];

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
