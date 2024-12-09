import { useState } from 'react'
import moment from 'moment'
import { mergeSlots, handleSlotOverlap } from './logicCustomCalendar'

const useCustomCalendar = () => {
  const [selectedSlots, setSelectedSlots] = useState([])

  const handleSelectSlot = (slotInfo) => {
    const dayOfWeek = moment(slotInfo.start).format('dddd')
    const startHour = moment(slotInfo.start).format('HH:mm')
    const endHour = moment(slotInfo.end).format('HH:mm')

    const newSlot = {
      day: dayOfWeek,
      start: startHour,
      end: endHour,
    }

    const updatedSlots = handleSlotOverlap(selectedSlots, newSlot)
    setSelectedSlots(mergeSlots(updatedSlots))
  }

  const handleEventClick = (event) => {
    const { day, start, end } = selectedSlots.find(
      (slot) =>
        slot.start === moment(event.start).format('HH:mm') &&
        slot.end === moment(event.end).format('HH:mm') &&
        slot.day === moment(event.start).format('dddd'),
    )
    setSelectedSlots((prevSlots) =>
      prevSlots.filter(
        (slot) =>
          !(slot.day === day && slot.start === start && slot.end === end),
      ),
    )
  }

  return {
    selectedSlots,
    handleSelectSlot,
    handleEventClick,
  }
}

export default useCustomCalendar
