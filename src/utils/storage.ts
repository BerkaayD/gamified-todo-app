import { STORAGE_KEY, createInitialState } from '../constants/game'
import type { StoredState, TodoTask } from '../types/todo'
import { todayKey } from './date'

function normalizeTask(task: TodoTask): TodoTask {
  return {
    ...task,
    dueDate: task.dueDate ?? task.createdAt?.slice(0, 10) ?? todayKey(),
  }
}

export function loadStoredState(): StoredState {
  const fallbackState = createInitialState()
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return fallbackState
  }

  try {
    const parsed = JSON.parse(saved) as StoredState

    return {
      tasks: Array.isArray(parsed.tasks)
        ? parsed.tasks.map(normalizeTask)
        : fallbackState.tasks,
      stats: parsed.stats ?? fallbackState.stats,
    }
  } catch {
    return fallbackState
  }
}

export function saveStoredState(state: StoredState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}
