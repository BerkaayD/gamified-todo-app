export type Difficulty = 'Kolay' | 'Orta' | 'Zor'

export type TodoTask = {
  id: string
  title: string
  difficulty: Difficulty
  xp: number
  completed: boolean
  dueDate: string
  createdAt: string
}

export type PlayerStats = {
  totalXp: number
  streak: number
  lastPerfectDay: string | null
}

export type StoredState = {
  tasks: TodoTask[]
  stats: PlayerStats
}

export type LevelInfo = {
  level: number
  xpIntoLevel: number
  progress: number
  xpToNext: number
}

export type DashboardMetrics = {
  completedCount: number
  totalCount: number
  dailyXp: number
  totalPossibleXp: number
  completionRate: number
}
