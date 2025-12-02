'use client'

import SurveySkeleton from '@/components/survey/SurveySkeleton'
import { Button } from '@/components/ui/button'
import { getProductCategories } from '@/services/categoriesProducts'
import { getServiceCategories } from '@/services/categoriesServices'
import { Category } from '@/types/category'
import { useEffect, useState } from 'react'

interface Question {
  title: string
  options: string[]
}

interface QuestionsGroup {
  group: string | null
  questions: Question[]
}

export default function SurveyPage() {
  const [productCategories, setProductCategories] = useState<Category[]>([])
  const [serviceCategories, setServiceCategories] = useState<Category[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [currentQuestions, setCurrentQuestions] = useState<QuestionsGroup>()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProductCategories = async () => {
      const data = await getProductCategories()
      if (data) {
        setProductCategories(data)
      }
    }
    const fetchServiceCategories = async () => {
      const data = await getServiceCategories()
      if (data) {
        setServiceCategories(data)
      }
    }

    const loadData = async () => {
      await fetchProductCategories()
      await fetchServiceCategories()
      setIsLoading(false)
    }

    setCurrentQuestions(baseQuestions)
    loadData()
  }, [])

  const baseQuestions: QuestionsGroup = {
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
  const productQuestions: QuestionsGroup = {
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

  const serviceQuestions: QuestionsGroup = {
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

  useEffect(() => {
    const evaluateAnswers = () => {
      const answersNum = answers.length
      const questionsNum = answersNum
        ? answers[0]
          ? serviceQuestions.questions.length + 1
          : productQuestions.questions.length + 1
        : Infinity

      if (answersNum === 1) {
        answers[0]
          ? setCurrentQuestions(serviceQuestions)
          : setCurrentQuestions(productQuestions)
        return
      }
      if (!isLoading && answers.length)
        setCurrentQuestionIndex((prev) => prev + 1)
      if (answersNum === questionsNum) setIsFinished(true)
    }
    evaluateAnswers()
  }, [answers])

  const calculateCategory = (answers: number[]): string => {
    // Cuenta la cantidad de apariciones de cada respuesta
    let countA = 0
    let countB = 0
    let countC = 0

    // Omite la respuesta de la pregunta 1
    for (let i = 1; i < answers.length; i++) {
      if (answers[i] === 0) countA++
      if (answers[i] === 1) countB++
      if (answers[i] === 2) countC++
    }

    // Servicios
    if (answers[0]) {
      if (countA > Math.max(countB, countC)) return serviceCategories[0].name
      if (countB > Math.max(countA, countC)) return serviceCategories[1].name
      if (countC > Math.max(countA, countB)) return serviceCategories[2].name
      if (countA === countB) return serviceCategories[3].name
      return 'No match'
    }
    // Productos
    if (countA > Math.max(countB, countC)) return productCategories[1].name
    if (countB > Math.max(countA, countC)) return productCategories[0].name
    if (countC > Math.max(countA, countB)) return productCategories[2].name
    return 'No match'
  }
  const generateQuestionInterface = () => {
    const group = currentQuestions!.group
    const questions = currentQuestions!.questions[currentQuestionIndex]

    if (!questions) return

    return (
      <div className="flex flex-col items-center text-center gap-10 max-w-200 mx-auto">
        {group && (
          <div className="bg-green-700 py-5 px-20 rounded-2xl text-white text-2xl font-bold">
            {group}
          </div>
        )}
        <div className="text-2xl text-white font-bold">{questions.title}</div>
        <div className="flex gap-10">
          {questions.options.map((op, index) => {
            return (
              <div
                key={index}
                className="bg-white hover:bg-gray-200 rounded-2xl p-10 text-2xl cursor-pointer select-none w-100"
                onClick={() => setAnswers((prev) => [...prev, index])}
              >
                {op}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const resetSurvey = () => {
    setCurrentQuestionIndex(0)
    setCurrentQuestions(baseQuestions)
    setAnswers([])
    setIsFinished(false)
  }

  function testCategory() {
    const results: number[][] = []
    const values = [0, 1, 2]
    const size = 5

    function backtrack(current: number[]) {
      if (current.length === size) {
        results.push([...current])
        return
      }

      for (const v of values) {
        current.push(v)
        backtrack(current)
        current.pop()
      }
    }

    backtrack([])
    results.map((r) => {
      const a = calculateCategory(r)
      if (a == 'No match' && r[0] != 2) {
        console.log(r, a)
      }
    })
  }

  // testCategory()

  if (isLoading)
    return (
      <div className="bg-brand min-h-150">
        <SurveySkeleton />
      </div>
    )
  return (
    <div className="bg-brand min-h-150 flex flex-col items-center p-10 gap-10">
      <h1 className="text-4xl font-bold text-white">
        Descubre tu camino hacia el bienestar
      </h1>
      {!isFinished ? (
        <div className="">{generateQuestionInterface()}</div>
      ) : (
        <div className="flex flex-col items-center text-center gap-25">
          <h1 className="text-2xl font-bold text-white">
            La categoría que te recomendamos es
          </h1>
          <h1 className="py-5 px-10 bg-white rounded-2xl text-3xl font-bold max-w-3/4">
            {calculateCategory(answers)}
          </h1>
          <Button onClick={resetSurvey}>Reiniciar cuestionario</Button>
        </div>
      )}
    </div>
  )
}
