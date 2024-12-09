'use client'

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import './custom-calendar.css'
import useCustomCalendar from './useCustomCalendar'

const localizer = momentLocalizer(moment)

const CustomCalendar = ({
  name = 'calendar',
  value = [],
  onChange = () => {},
}) => {
  const { selectedSlots, handleSelectSlot, handleEventClick } =
    useCustomCalendar()

  const handleSlotSelection = (slots) => {
    handleSelectSlot(slots) // Actualiza los slots seleccionados en el estado interno
    const inputEvent = {
      target: {
        name,
        value: JSON.stringify(slots),
      },
    }
    onChange(inputEvent) // Simula un evento de cambio para el padre
  }

  return (
    <div>
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(selectedSlots)}
        readOnly
        onChange={(e) => {
          onChange(e)
        }}
      />
      <Calendar
        localizer={localizer}
        events={selectedSlots.map((slot) => ({
          title: `${slot.start} - ${slot.end}`,
          start: moment()
            .day(slot.day)
            .set({
              hour: slot.start.split(':')[0],
              minute: slot.start.split(':')[1],
            })
            .toDate(),
          end: moment()
            .day(slot.day)
            .set({
              hour: slot.end.split(':')[0],
              minute: slot.end.split(':')[1],
            })
            .toDate(),
        }))}
        selectable
        defaultView={Views.WEEK}
        views={{ week: true }}
        step={15}
        timeslots={6}
        defaultDate={new Date()} // Usamos la fecha generada en el cliente
        onSelectSlot={handleSlotSelection}
        onSelectEvent={handleEventClick}
        style={{ height: 600 }}
        toolbar={false}
        min={new Date(1970, 1, 1, 9, 0, 0)}
        max={new Date(1970, 1, 1, 22, 0, 0)}
        showCurrentTimeIndicator={false}
      />
    </div>
  )
}

export default CustomCalendar
