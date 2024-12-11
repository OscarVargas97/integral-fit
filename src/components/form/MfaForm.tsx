'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mfaAuth } from 'utils/supabase/auth'

const MfaForm = () => {
  const router = useRouter()
  const [values, setValues] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(false)

  const handleChange = (index, value) => {
    // Solo aceptar caracteres numéricos
    if (!/^\d?$/.test(value)) return

    const updatedValues = [...values]

    if (!value) {
      // Si el valor está vacío, eliminar en cascada
      for (let i = index; i < values.length - 1; i++) {
        updatedValues[i] = updatedValues[i + 1]
      }
      updatedValues[values.length - 1] = '' // Último campo vacío
    } else {
      updatedValues[index] = value
    }

    setValues(updatedValues)

    // Cambiar el foco solo si se ingresa un valor válido
    if (value && index < values.length - 1) {
      document.getElementById(`input-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && values[index] === '') {
      const updatedValues = [...values]
      // Si el valor está vacío, mover valores hacia la izquierda
      for (let i = index; i < values.length - 1; i++) {
        updatedValues[i] = updatedValues[i + 1]
      }
      updatedValues[values.length - 1] = '' // Último campo vacío
      setValues(updatedValues)

      // Cambiar el foco al anterior si no es el primero
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()

    const clipboardData = e.clipboardData.getData('text')
    const numbers = clipboardData.replace(/\D/g, '') // Extraer solo números

    if (numbers.length === 0) return

    const updatedValues = [...values]
    let index = 0

    for (let i = 0; i < values.length && index < numbers.length; i++) {
      if (updatedValues[i] === '') {
        updatedValues[i] = numbers[index]
        index++
      }
    }

    setValues(updatedValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.some((val) => val === '')) {
      setError(true)
      return
    }
    const otp = values.join('')
    setError(false)
    await mfaAuth(e, router, otp)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <div className="flex space-x-2">
        {values.map((val, index) => (
          <input
            key={index}
            id={`input-${index}`}
            type="text"
            maxLength={1}
            value={val}
            onChange={(e) => {
              handleChange(index, e.target.value)
            }}
            onKeyDown={(e) => {
              handleKeyDown(index, e)
            }}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      {error && (
        <p className="text-red-500 text-sm">
          Por favor, completa todos los campos.
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  )
}

export default MfaForm
