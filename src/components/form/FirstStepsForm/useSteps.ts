import { useState } from 'react'

const useSteps = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState('')

  const handleNext = (currentData) => {
    const isValid = currentData.every((field) => field.value !== '')
    if (!isValid) {
      setError('Todos los campos son obligatorios')
      return
    }
    setError('')
    setStep((prev) => prev + 1)
  }

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (e, fields) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return {
    step,
    error,
    handleNext,
    handlePrev,
    handleSubmit,
    handleInputChange,
    formData,
  }
}

export default useSteps
