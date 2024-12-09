'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const MfaForm = () => {
  const router = useRouter()
  const [values, setValues] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(false)

  const handleChange = (index, value) => {
    if (value.length > 1) return

    const updatedValues = [...values]
    // Si el valor está vacío, reubicar los números restantes
    if (!value) {
      for (let i = index; i < values.length - 1; i++) {
        updatedValues[i] = updatedValues[i + 1]
      }
      updatedValues[values.length - 1] = '' // Último campo vacío
    } else {
      updatedValues[index] = value.replace(/\D/, '')
    }
    setValues(updatedValues)

    // Cambiar el foco solo si se ingresa un valor válido
    if (value && index < values.length - 1) {
      document.getElementById(`input-${index + 1}`).focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.some((val) => val === '')) {
      setError(true)
      return
    }
    setError(false)
    console.log('Código ingresado:', values.join(''))
    router.push('/first-steps')
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
