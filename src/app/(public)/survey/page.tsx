'use client'

import SurveySkeleton from '@/components/survey/SurveySkeleton'
import { Button } from '@/components/ui/button'
import { getProductCategories } from '@/services/categoriesProducts'
import { getServiceCategories } from '@/services/categoriesServices'
import { Category } from '@/types/category'
import { QuestionsGroup } from '@/types/surveyQuestions'
import {
  baseQuestions,
  productQuestions,
  serviceQuestions,
} from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SurveyPage() {
  const router = useRouter()
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
      if (countA === countC) return serviceCategories[0].name
      if (countB === countC) return serviceCategories[1].name
      return 'No hay coincidencias'
    }
    // Productos
    if (countA > Math.max(countB, countC)) return productCategories[1].name
    if (countB > Math.max(countA, countC)) return productCategories[0].name
    if (countC > Math.max(countA, countB)) return productCategories[2].name
    if (countA === countB) return productCategories[0].name
    if (countA === countC) return productCategories[1].name
    if (countB === countC) return productCategories[2].name
    return 'No hay coincidencias'
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

  const redirectToSection = () => {
    const section = answers[0] ? 'services' : 'products'
    const category = calculateCategory(answers)
    router.push(`/${section}/${category}`)
  }

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
          <h1
            onClick={redirectToSection}
            className="py-5 px-10 bg-white rounded-2xl text-3xl font-bold max-w-3/4 cursor-pointer"
          >
            {calculateCategory(answers)}
          </h1>
          <Button onClick={resetSurvey}>Reiniciar cuestionario</Button>
        </div>
      )}
    </div>
  )
}
