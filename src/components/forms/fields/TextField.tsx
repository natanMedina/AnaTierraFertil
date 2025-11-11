import { Input } from '@/components/ui/input'

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
}: {
  label: string
  placeholder: string
  value?: string
  onChange: (e: any) => void
  error?: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        className="text-xl font-semibold"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
