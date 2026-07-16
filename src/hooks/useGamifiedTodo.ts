import { useEffect, useMemo, useState } from 'react'
import { createTask, difficultyXp } from '../constants/game'
import type { Difficulty, PlayerStats, TodoTask } from '../types/todo'
import { todayKey, yesterdayKey } from '../utils/date'
import {
  calculateDashboardMetrics,
  calculateLevelInfo,
  pickMotivationMessage,
} from '../utils/game'
import { loadStoredState, saveStoredState } from '../utils/storage'

export function useGamifiedTodo() {
  const [tasks, setTasks] = useState<TodoTask[]>(() => loadStoredState().tasks)
  const [stats, setStats] = useState<PlayerStats>(() => loadStoredState().stats)
  const [dailyMessage, setDailyMessage] = useState('')
  const currentDate = todayKey()
  const todayTasks = useMemo(
    () => tasks.filter((task) => task.dueDate <= currentDate),
    [currentDate, tasks],
  )
  const upcomingTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.dueDate > currentDate)
        .sort((firstTask, secondTask) =>
          firstTask.dueDate.localeCompare(secondTask.dueDate),
        ),
    [currentDate, tasks],
  )

  const metrics = useMemo(() => calculateDashboardMetrics(todayTasks), [todayTasks])
  const levelInfo = useMemo(
    () => calculateLevelInfo(stats.totalXp),
    [stats.totalXp],
  )
  const perfectDay =
    todayTasks.length > 0 && todayTasks.every((task) => task.completed)

  useEffect(() => {
    saveStoredState({ tasks, stats })
  }, [tasks, stats])

  useEffect(() => {
    if (!perfectDay || stats.lastPerfectDay === todayKey()) {
      return
    }

    setDailyMessage(pickMotivationMessage())
    setStats((currentStats) => ({
      ...currentStats,
      streak:
        currentStats.lastPerfectDay === yesterdayKey()
          ? currentStats.streak + 1
          : 1,
      lastPerfectDay: todayKey(),
    }))
  }, [perfectDay, stats.lastPerfectDay])

  const addTask = (title: string, difficulty: Difficulty, dueDate: string) => {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      return
    }

    setTasks((currentTasks) => [
      createTask(trimmedTitle, difficulty, dueDate || currentDate),
      ...currentTasks,
    ])
    setDailyMessage('')
  }

  const toggleTask = (taskId: string) => {
    const targetTask = tasks.find((task) => task.id === taskId)

    if (!targetTask) {
      return
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
    setStats((currentStats) => ({
      ...currentStats,
      totalXp: Math.max(
        0,
        currentStats.totalXp + (targetTask.completed ? -targetTask.xp : targetTask.xp),
      ),
    }))
  }

  const removeTask = (taskId: string) => {
    const targetTask = tasks.find((task) => task.id === taskId)

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))

    if (targetTask?.completed) {
      setStats((currentStats) => ({
        ...currentStats,
        totalXp: Math.max(0, currentStats.totalXp - targetTask.xp),
      }))
    }
  }

  const editTask = (
    taskId: string,
    title: string,
    difficulty: Difficulty,
    dueDate: string,
  ) => {
    const targetTask = tasks.find((task) => task.id === taskId)

    if (!targetTask || !title.trim() || !dueDate) {
      return
    }

    const nextXp = difficultyXp[difficulty]
    const xpDifference = nextXp - targetTask.xp

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, title: title.trim(), difficulty, dueDate, xp: nextXp }
          : task,
      ),
    )

    if (targetTask.completed && xpDifference !== 0) {
      setStats((currentStats) => ({
        ...currentStats,
        totalXp: Math.max(0, currentStats.totalXp + xpDifference),
      }))
    }

    setDailyMessage('')
  }

  const resetDay = () => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.dueDate <= currentDate ? { ...task, completed: false } : task,
      ),
    )
    setDailyMessage('')
  }

  return {
    tasks,
    todayTasks,
    upcomingTasks,
    stats,
    metrics,
    levelInfo,
    perfectDay,
    dailyMessage,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    resetDay,
  }
}
