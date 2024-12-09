'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import './custom-calendar.css'

const localizer = momentLocalizer(moment)

const CustomCalendar = ({ name = 'calendar' }) => {
  const [selectedSlots, setSelectedSlots] = useState([])
  const [defaultDate, setDefaultDate] = useState(null)

  useEffect(() => {
    // Generar defaultDate solo en el cliente
    setDefaultDate(new Date())
  }, [])

  const mergeSlots = (slots) => {
    const sortedSlots = slots
      .filter((slot) => slot.start && slot.end && slot.day) // Filtrar elementos inválidos
      .sort((a, b) => {
        const dayComparison = a.day.localeCompare(b.day)
        return dayComparison !== 0
          ? dayComparison
          : a.start.localeCompare(b.start)
      })

    const mergedSlots = []
    let currentSlot = sortedSlots[0]

    for (let i = 1; i < sortedSlots.length; i++) {
      const nextSlot = sortedSlots[i]
      if (
        currentSlot.day === nextSlot.day &&
        moment(`${currentSlot.day} ${currentSlot.end}`, 'dddd HH:mm')
          .add(15, 'minutes') // Permite fusión con un hueco de hasta 15 minutos
          .isAfter(moment(`${nextSlot.day} ${nextSlot.start}`, 'dddd HH:mm'))
      ) {
        currentSlot = {
          ...currentSlot,
          end: moment
            .max(
              moment(`${currentSlot.day} ${currentSlot.end}`, 'dddd HH:mm'),
              moment(`${nextSlot.day} ${nextSlot.end}`, 'dddd HH:mm'),
            )
            .format('HH:mm'),
        }
      } else {
        mergedSlots.push(currentSlot)
        currentSlot = nextSlot
      }
    }
    if (currentSlot) mergedSlots.push(currentSlot)
    return mergedSlots
  }

  const handleSelectSlot = (slotInfo) => {
    const dayOfWeek = moment(slotInfo.start).format('dddd')
    const startHour = moment(slotInfo.start).format('HH:mm')
    const endHour = moment(slotInfo.end).format('HH:mm')

    const newSlot = {
      day: dayOfWeek,
      start: startHour,
      end: endHour,
    }

    const updatedSlots = []
    let overlapsRemoved = false

    for (const slot of selectedSlots) {
      if (slot.day === newSlot.day) {
        if (
          moment(slot.start, 'HH:mm').isBefore(
            moment(newSlot.start, 'HH:mm'),
          ) &&
          moment(slot.end, 'HH:mm').isAfter(moment(newSlot.end, 'HH:mm'))
        ) {
          // Si el nuevo intervalo está en el medio, dividir el intervalo existente
          updatedSlots.push({
            day: slot.day,
            start: slot.start,
            end: newSlot.start,
          })
          updatedSlots.push({
            day: slot.day,
            start: newSlot.end,
            end: slot.end,
          })
          overlapsRemoved = true
        } else if (
          moment(slot.start, 'HH:mm').isBefore(moment(newSlot.end, 'HH:mm')) &&
          moment(slot.end, 'HH:mm').isAfter(moment(newSlot.start, 'HH:mm'))
        ) {
          // Si hay solapamiento parcial, ajustar los intervalos existentes
          if (
            moment(slot.start, 'HH:mm').isBefore(moment(newSlot.start, 'HH:mm'))
          ) {
            updatedSlots.push({
              day: slot.day,
              start: slot.start,
              end: newSlot.start,
            })
          }
          if (moment(slot.end, 'HH:mm').isAfter(moment(newSlot.end, 'HH:mm'))) {
            updatedSlots.push({
              day: slot.day,
              start: newSlot.end,
              end: slot.end,
            })
          }
          overlapsRemoved = true
        } else {
          // Si no hay solapamiento, mantener el intervalo
          updatedSlots.push(slot)
        }
      } else {
        // Si es un día diferente, mantener el intervalo
        updatedSlots.push(slot)
      }
    }

    if (!overlapsRemoved) {
      updatedSlots.push(newSlot)
    }

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

  if (!defaultDate) {
    // Evitar renderizar el calendario antes de tener la fecha predeterminada
    return null
  }

  return (
    <div name="calendar">
      <input
        type="hidden"
        name={name}
        value={JSON.stringify(selectedSlots)}
        readOnly
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
        defaultDate={defaultDate} // Usamos la fecha generada en el cliente
        onSelectSlot={handleSelectSlot}
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
