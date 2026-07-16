import { motivationMessages, XP_PER_LEVEL } from '../constants/game'
import type { DashboardMetrics, LevelInfo, TodoTask } from '../types/todo'

export function calculateLevelInfo(totalXp: number): LevelInfo {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
  const xpIntoLevel = totalXp % XP_PER_LEVEL
  const progress = Math.round((xpIntoLevel / XP_PER_LEVEL) * 100)

  return {
    level,
    xpIntoLevel,
    progress,
    xpToNext: XP_PER_LEVEL - xpIntoLevel,
  }
}

export function calculateDashboardMetrics(tasks: TodoTask[]): DashboardMetrics {
  const completedTasks = tasks.filter((task) => task.completed)
  const dailyXp = completedTasks.reduce((sum, task) => sum + task.xp, 0)
  const totalPossibleXp = tasks.reduce((sum, task) => sum + task.xp, 0)
  const completionRate =
    tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100)

  return {
    completedCount: completedTasks.length,
    totalCount: tasks.length,
    dailyXp,
    totalPossibleXp,
    completionRate,
  }
}

export function pickMotivationMessage() {
  return motivationMessages[Math.floor(Math.random() * motivationMessages.length)]
}
