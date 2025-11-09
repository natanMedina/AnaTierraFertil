import { Textarea } from '@/components/ui/textarea'

export default function TextAreaField({
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
      <Textarea
        placeholder={placeholder}
        className="h-48 resize-none"
        value={value}
        onChange={onChange}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
