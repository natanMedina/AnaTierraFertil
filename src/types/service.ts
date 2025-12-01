export interface Service {
  id: number
  name: string
  description: string
  category_fk: number
  photo_url: string
  video_url: string
  price: number
  price_live_class: number
}
