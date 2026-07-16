import { useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarDays, Plus, RotateCcw } from 'lucide-react'
import { difficultyOptions } from '../constants/game'
import type { Difficulty, TodoTask } from '../types/todo'
import { todayKey } from '../utils/date'
import { TaskItem } from './TaskItem'

type TaskPanelProps = {
  tasks: TodoTask[]
  onAddTask: (title: string, difficulty: Difficulty, dueDate: string) => void
  onToggleTask: (taskId: string) => void
  onRemoveTask: (taskId: string) => void
  onEditTask: (
    taskId: string,
    title: string,
    difficulty: Difficulty,
    dueDate: string,
  ) => void
  onResetDay: () => void
}

export function TaskPanel({
  tasks,
  onAddTask,
  onToggleTask,
  onRemoveTask,
  onEditTask,
  onResetDay,
}: TaskPanelProps) {
  const [taskTitle, setTaskTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('Orta')
  const [dueDate, setDueDate] = useState(todayKey())

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddTask(taskTitle, difficulty, dueDate)
    setTaskTitle('')
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm shadow-black/30">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-300">Gorevler</p>
          <h2 className="mt-1 text-2xl font-bold tracking-normal text-white">
            Gunluk liste
          </h2>
        </div>
        <button
          type="button"
          onClick={onResetDay}
          title="Gunu sifirla"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-700 px-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <RotateCcw className="h-4 w-4" />
          Sifirla
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid gap-3 rounded-lg border border-slate-800 bg-slate-950 p-3 sm:grid-cols-[1fr_140px_170px_44px]"
      >
        <input
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          placeholder="Yeni gorev ekle"
          className="h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
        />
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value as Difficulty)}
          className="h-11 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm font-medium text-slate-100 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
        >
          {difficultyOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <label className="relative block">
          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="date"
            value={dueDate}
            min={todayKey()}
            onChange={(event) => setDueDate(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3 text-sm font-medium text-slate-100 outline-none transition [color-scheme:dark] focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
          />
        </label>
        <button
          type="submit"
          title="Gorev ekle"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-500 text-slate-950 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
            />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950 p-5 text-sm font-medium text-slate-400">
            Bugun icin gorev yok. Yeni bir gorev ekleyerek baslayabilirsin.
          </div>
        )}
      </div>
    </div>
  )
}
