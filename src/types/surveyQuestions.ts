export interface Question {
  title: string
  options: string[]
}

export interface QuestionsGroup {
  group: string | null
  questions: Question[]
}
