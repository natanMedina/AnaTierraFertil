import { Textarea } from '@/components/ui/textarea'

export default function TextAreaField({
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
      <Textarea
        placeholder={placeholder}
        className="h-48 resize-none custom-scrollbar whitespace-pre-wrap break-words"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
