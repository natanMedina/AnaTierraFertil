import { Input } from '@/components/ui/input'
import { getYouTubeEmbedUrl } from '@/utils/formatters'

export default function VideoField({
  video_url,
  onChange,
  error,
  disabled = false,
}: {
  video_url?: string
  onChange: (e: any) => void
  error?: string
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow">
      <div className="w-60 h-60 rounded-2xl flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
        {video_url && getYouTubeEmbedUrl(video_url) ? (
          <iframe
            src={getYouTubeEmbedUrl(video_url)!}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <span className="text-gray-500">Video</span>
        )}
      </div>
      {/* Campo para link de YouTube */}
      <Input
        placeholder="Enlace de YouTube"
        className="max-w-sm text-center"
        value={video_url}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="form-field-error">{error}</p>}
    </div>
  )
}
