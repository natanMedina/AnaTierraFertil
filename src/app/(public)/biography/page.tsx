'use client'

import { SpecialMomentsSection } from '@/components/shared/SpecialMoments'
import { Background } from '@/components/shared/Background'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { siteConfig } from '@/config/site'

const BiographySection = () => (
  <div className="relative z-10 py-16 bg-white">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="flex flex-col lg:flex-row items-stretch gap-12">
        {/* Columna Izquierda - Imagen */}
        <div className="relative lg:w-1/3 w-full h-[500px] lg:h-auto bg-brand rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <span className="text-white text-2xl font-bold">Foto aquí</span>
        </div>

        {/* Columna Derecha - Contenido de Texto */}
        <Card className="lg:w-2/3 p-8 shadow-lg rounded-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-4xl font-bold text-gray-800 mb-4">
              {siteConfig.biography.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {siteConfig.biography.name} -{' '}
              <span className="text-brand font-medium">
                {siteConfig.biography.username}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700 text-lg leading-relaxed">
            {siteConfig.biography.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const JourneySection = () => (
  <div className="relative z-10 py-16 bg-gray-50">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <div className="max-w-5xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Mi recorrido
          </h2>
          {siteConfig.biography.experiencie.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Placeholder 1 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 1</span>
        </div>

        {/* Placeholder 2 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 2</span>
        </div>

        {/* Placeholder 3 */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-semibold">Imagen 3</span>
        </div>
      </div>
    </div>
  </div>
)

const SocialSection = () => (
  <div className="relative z-10 py-16 bg-brand-light">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Imagen de la sección */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Conoce un poco más
          </h2>
          <p className="max-w-2xl text-lg text-gray-700 leading-relaxed text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            id dolor pellentesque, convallis orci a, aliquam mi. Aenean
            tristique, ligula eu elementum suscipit, lacus cursus massa, eu
            cursus diam tellus sed neque. Mauris venenatis gravida sodales.
            Integer sollicitudin dapibus ornare.
          </p>
        </div>

        {/* Íconos de redes sociales */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/ana.tierrafertil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 group"
          >
            <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  fill="#0F0F0F"
                />
                <path
                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                  fill="#0F0F0F"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                  fill="#0F0F0F"
                />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-800 group-hover:text-brand transition-colors">
              @ana.tierrafertil
            </span>
          </a>

          {/* Blog */}
          <a href="/news" className="flex items-center gap-4 group">
            <div className="w-12 h-12 flex items-center justify-center transition-transform group-hover:scale-110">
              <svg
                width="48"
                height="48"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M416.428,0.004H95.58C42.787,0.013,0.016,42.792,0,95.577v303.685
                  c0.025,62.262,50.463,112.717,112.742,112.734h286.524c62.27-0.017,112.717-50.464,112.734-112.734V95.577
                  C511.992,42.792,469.212,0.013,416.428,0.004z M464.805,399.262c-0.008,18.15-7.308,34.424-19.198,46.34
                  c-11.916,11.891-28.19,19.19-46.34,19.198H112.742c-18.15-0.009-34.433-7.308-46.348-19.198
                  c-11.892-11.916-19.182-28.19-19.198-46.34V118.696h417.61V399.262z"
                  fill="#0F0F0F"
                />
              </svg>
            </div>
            <span className="text-lg font-medium text-gray-800 group-hover:text-brand transition-colors">
              Explora mi blog
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export default function BiographyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[95vh] text-center px-4 pt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            El arte de acompañar
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-gray-700 leading-relaxed">
            Soy partera intercultural, doula, educadora en salud materna,
            profesora de yoga prenatal y consultora en salud ayurveda para la
            mujer, además socióloga con una maestría en asesoría familiar.
            Acompaño los procesos de gestación, parto y posparto desde una
            mirada integral que une los saberes ancestrales, la medicina natural
            y las prácticas del yoga. Mi labor se centra en promover el
            autocuidado, la conexión cuerpo-espíritu y el respeto por los ritmos
            naturales de la vida femenina, creando espacios de acompañamiento
            educativos y conscientes para mujeres, familias y comunidades.
          </p>
        </div>
        <BiographySection />
        <JourneySection />
        <SocialSection />
        <SpecialMomentsSection />
      </div>
    </div>
  )
}
