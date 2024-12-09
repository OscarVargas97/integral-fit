import { type ChangeEvent } from 'react'

interface InputFieldProps {
  name: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const InputField = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <label className="block">
      <span className="text-gray-700">{label}:</span>
      {type === 'textarea' ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </label>
  )
}

export default InputField
