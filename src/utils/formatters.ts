// Convierte una URL de YouTube normal en su versión embebida y sin cookies

export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return ''

  try {
    const parsedUrl = new URL(url)

    // Si ya es formato embed, lo dejamos igual
    if (parsedUrl.pathname.startsWith('/embed/')) {
      return url
    }

    // Si es un link corto tipo youtu.be/<id>
    if (parsedUrl.hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.slice(1)
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Si es un shorts: /shorts/<id>
    if (parsedUrl.pathname.startsWith('/shorts/')) {
      const videoId = parsedUrl.pathname.split('/')[2]
      return `https://www.youtube.com/embed/${videoId}`
    }

    // Si es una URL normal con ?v=<id>
    const videoId = parsedUrl.searchParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }

    // En cualquier otro caso, la devolvemos tal cual (por si es otro dominio)
    return url
  } catch {
    // Si algo sale mal con la URL
    return ''
  }
}
