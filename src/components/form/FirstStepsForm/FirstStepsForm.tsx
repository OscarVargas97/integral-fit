'use client'

import React from 'react'
import steps from './steps'
import useSteps from 'components/form/FirstStepsForm/useSteps'

const FirstSteps = () => {
  const {
    step,
    error,
    handleNext,
    handlePrev,
    handleSubmit,
    handleInputChange,
    formData,
  } = useSteps()

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(
          e,
          steps[step]
            .map((field) => ({
              name: field.props.name,
              value: formData[field.props.name] || '',
            }))
            .concat({
              name: 'calendarSlots',
              value: formData.calendarSlots || [],
            }),
        )
      }}
      className="relative w-full max-w-md mx-auto overflow-hidden"
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${step * 100}%)` }}
      >
        {steps.map((group, index) => (
          <div
            key={index}
            data-step={index}
            className="w-full flex-shrink-0 p-4 bg-white space-y-4"
          >
            {group.map((field) =>
              React.cloneElement(field, {
                value: formData[field.props.name] || '',
                onChange: handleInputChange,
              }),
            )}
          </div>
        ))}
      </div>
      {/* Bloque de mensaje de error con espacio reservado */}
      <div className="h-6 mt-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="flex justify-between mt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Anterior
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => {
              handleNext(
                steps[step].map((field) => ({
                  name: field.props.name,
                  value: formData[field.props.name] || '',
                })),
              )
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Enviar
          </button>
        )}
      </div>
    </form>
  )
}

export default FirstSteps
