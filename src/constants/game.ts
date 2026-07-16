import type { Difficulty, StoredState, TodoTask } from '../types/todo'
import { todayKey } from '../utils/date'

export const STORAGE_KEY = 'gamified-todo-state'
export const XP_PER_LEVEL = 250

export const difficultyXp: Record<Difficulty, number> = {
  Kolay: 25,
  Orta: 50,
  Zor: 90,
}

export const motivationMessages = [
  'Bugunun tum gorevleri tamamlandi. Disiplinin seviye atladi.',
  'Harika bir seri yakaladin. Yarinin sana daha kolay gelecek.',
  'Kucuk gorevler buyuk ivme yaratir. Bugun bunu kanitladin.',
  'Tamamlama oranin mukemmel. Kendine guvenmek icin guzel bir sebep daha.',
]

export const difficultyOptions = Object.keys(difficultyXp) as Difficulty[]

export function createTask(
  title: string,
  difficulty: Difficulty,
  dueDate = todayKey(),
): TodoTask {
  return {
    id: crypto.randomUUID(),
    title,
    difficulty,
    xp: difficultyXp[difficulty],
    completed: false,
    dueDate,
    createdAt: new Date().toISOString(),
  }
}

export function createInitialState(): StoredState {
  return {
    tasks: [
      createTask('Sabah planini yaz', 'Kolay'),
      createTask('Odakli calisma blogunu bitir', 'Zor'),
      createTask('Gun sonu kisa degerlendirme yap', 'Orta'),
    ],
    stats: {
      totalXp: 0,
      streak: 0,
      lastPerfectDay: null,
    },
  }
}
