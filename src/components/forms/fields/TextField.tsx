import { Input } from '@/components/ui/input'

export default function TextField({
  label,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string
  placeholder: string
  value?: string
  onChange: (e: any) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        className="text-xl font-semibold"
        value={value}
        onChange={onChange}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
