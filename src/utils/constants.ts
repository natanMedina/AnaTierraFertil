import { QuestionsGroup } from '@/types/surveyQuestions'

export const baseQuestions: QuestionsGroup = {
  group: null,
  questions: [
    {
      title: '¿Qué estás buscando?',
      options: [
        'Un Producto: Un elemento físico o digital que puedas adquirir y usar por tu cuenta (ej: un libro, un aceite esencial, una tintura, toallas de tela).',
        'Un Servicio: Una experiencia, acompañamiento o asesoría guiada por una especialista (ej: una clase de yoga, una consulta, un masaje, un curso).',
      ],
    },
  ],
}
export const productQuestions: QuestionsGroup = {
  group: 'PRODUCTOS',
  questions: [
    {
      title: '¿Qué formato te resulta más útil?',
      options: [
        'Guías prácticas y educativas (manuales, libros digitales).',
        'Preparados naturales listos para usar (mezclas, aceites, tinturas).',
        'Artículos de cuidado personal reutilizables (productos ecológicos).',
      ],
    },
    {
      title: '¿Cuál es tu objetivo principal?',
      options: [
        'Aprender y prepararme para una etapa específica como la maternidad.',
        'Aliviar molestias físicas o emocionales de forma natural.',
        'Adoptar un estilo de vida más sostenible y consciente.',
      ],
    },
    {
      title: '¿Para qué momento del día lo buscas?',
      options: [
        'Para momentos de estudio y aprendizaje (lectura, práctica).',
        'Para incorporar en rutinas diarias (bebidas, aromaterapia, suplementos).',
        'Para reemplazar productos de uso cotidiano por alternativas ecológicas.',
      ],
    },
    {
      title: '¿Buscas resultados a corto o largo plazo?',
      options: [
        'Información duradera que pueda consultar repetidamente.',
        'Efectos perceptibles en días o semanas (bienestar físico/emocional).',
        'Una inversión a largo plazo en salud y sostenibilidad.',
      ],
    },
  ],
}

export const serviceQuestions: QuestionsGroup = {
  group: 'SERVICIOS',
  questions: [
    {
      title: '¿En qué ámbito buscas apoyo?',
      options: [
        'Salud femenina y maternidad (embarazo, parto, lactancia, ciclo menstrual).',
        'Movimiento y manejo del estrés (yoga, relajación, estiramientos).',
        'Aprendizaje especializado (cursos sobre temas específicos).',
      ],
    },
    {
      title: '¿Qué tipo de interacción prefieres?',
      options: [
        'Acompañamiento personalizado 1 a 1 (consultas, sesiones privadas).',
        'Clases grupales en vivo (comunidad, horarios fijos).',
        'Contenido pregrabado (flexibilidad total de horarios).',
      ],
    },
    {
      title: '¿Cuál es tu necesidad más inmediata?',
      options: [
        'Soporte emocional y físico en una etapa de cambio (embarazo, posparto).',
        'Aliviar tensiones y reconectar con mi cuerpo.',
        'Adquirir conocimientos prácticos para aplicar en mi día a día.',
      ],
    },
    {
      title: '¿Qué valoras más en la experiencia?',
      options: [
        'La personalización y adaptación a mis necesidades únicas.',
        'La energía grupal y el sentido de comunidad.',
        'La autonomía y libertad para aprender a mi ritmo.',
      ],
    },
  ],
}
