import { Input } from '@/components/ui/input'

export default function PriceField({
  price,
  onChange,
  error,
}: {
  price?: number
  onChange: (e: any) => void
  error?: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-3">
      <label>{`Precio (pesos col.)`}</label>
      <Input
        placeholder="Valor en pesos (COP)"
        type="number"
        min={0}
        max={10 ** 6}
        className="text-center font-bold text-lg"
        value={price === 0 ? '' : price}
        onChange={onChange}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
