'use client'

import { useState, useEffect } from 'react'
import moment from 'moment'

const useCustomCalendar = () => {
  const [selectedSlots, setSelectedSlots] = useState([])
  const [defaultDate, setDefaultDate] = useState(null)

  useEffect(() => {
    // Generar defaultDate solo en el cliente
    setDefaultDate(new Date())
  }, [])

  const mergeSlots = (slots) => {
    const sortedSlots = slots
      .filter((slot) => slot.start && slot.end && slot.day)
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
          .add(15, 'minutes')
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

    const newSlot = { day: dayOfWeek, start: startHour, end: endHour }

    const updatedSlots = []
    let overlapsRemoved = false

    for (const slot of selectedSlots) {
      if (slot.day === newSlot.day) {
        if (
          moment(slot.start, 'HH:mm').isBefore(moment(newSlot.end, 'HH:mm')) &&
          moment(slot.end, 'HH:mm').isAfter(moment(newSlot.start, 'HH:mm'))
        ) {
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
          updatedSlots.push(slot)
        }
      } else {
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

  return {
    selectedSlots,
    defaultDate,
    handleSelectSlot,
    handleEventClick,
  }
}

export default useCustomCalendar
