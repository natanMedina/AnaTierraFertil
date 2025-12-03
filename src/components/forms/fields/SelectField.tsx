import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SelectField({
  label,
  placeholder,
  value,
  values,
  onChange,
  error,
  disabled = false,
}: {
  label: string
  placeholder: string
  value?: string | undefined
  values: { id: number; name: string }[]
  onChange: (e: any) => void
  error?: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Select disabled={disabled} value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((v) => (
              <SelectItem key={v.id} value={v.id.toString()}>
                {v.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
