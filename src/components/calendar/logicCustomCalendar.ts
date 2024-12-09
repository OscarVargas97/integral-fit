import moment from 'moment'

export const mergeSlots = (slots) => {
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

export const handleSlotOverlap = (selectedSlots, newSlot) => {
  const updatedSlots = []
  let overlapsRemoved = false

  for (const slot of selectedSlots) {
    if (slot.day === newSlot.day) {
      if (
        moment(slot.start, 'HH:mm').isBefore(moment(newSlot.start, 'HH:mm')) &&
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

  return updatedSlots
}
