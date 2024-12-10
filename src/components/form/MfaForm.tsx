'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mfaAuth } from 'lib/supabase/auth'

const MfaForm = () => {
  const router = useRouter()
  const [values, setValues] = useState(['', '', '', '', '', ''])
  // const [error, setError] = useState(false)

  const handleChange = (index: number, value: string) => {
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
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otp = values.join('')
    try {
      await mfaAuth(e, router, otp)
    } catch (err) {
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {values.map((value, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={value}
          onChange={(e) => {
            handleChange(index, e.target.value)
          }}
          maxLength={1}
        />
      ))}
    </form>
  )
}

export default MfaForm
