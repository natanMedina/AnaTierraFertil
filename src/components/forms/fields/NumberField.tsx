import { Input } from '@/components/ui/input'

export default function NumberField({
  label,
  placeholder,
  min,
  max,
  value,
  onChange,
  error,
}: {
  label: string
  placeholder?: string
  value?: number
  min?: number
  max?: number
  onChange: (e: any) => void
  error?: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-3">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        type="number"
        min={min}
        max={max}
        className="text-center font-bold text-lg"
        value={value === 0 ? '' : value}
        onChange={onChange}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
