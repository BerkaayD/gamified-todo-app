import { useState } from 'react'
import type { FormEvent } from 'react'
import { CalendarDays, Check, Pencil, Save, Trash2, X } from 'lucide-react'
import { difficultyOptions } from '../constants/game'
import type { Difficulty, TodoTask } from '../types/todo'
import { formatDisplayDate, todayKey } from '../utils/date'

type TaskItemProps = {
  task: TodoTask
  onToggle: (taskId: string) => void
  onRemove: (taskId: string) => void
  onEdit: (
    taskId: string,
    title: string,
    difficulty: Difficulty,
    dueDate: string,
  ) => void
}

export function TaskItem({ task, onToggle, onRemove, onEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [difficulty, setDifficulty] = useState<Difficulty>(task.difficulty)
  const [dueDate, setDueDate] = useState(task.dueDate)

  const startEditing = () => {
    setTitle(task.title)
    setDifficulty(task.difficulty)
    setDueDate(task.dueDate)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setTitle(task.title)
    setDifficulty(task.difficulty)
    setDueDate(task.dueDate)
    setIsEditing(false)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedTitle = title.trim()

    if (!trimmedTitle || !dueDate) {
      return
    }

    onEdit(task.id, trimmedTitle, difficulty, dueDate)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-lg border border-teal-700 bg-slate-950 p-4 shadow-sm shadow-black/20 sm:grid-cols-[1fr_140px_170px_auto]"
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-label="Gorev basligi"
          autoFocus
          className="h-10 min-w-0 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
        />
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value as Difficulty)}
          aria-label="Gorev zorlugu"
          className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm font-medium text-slate-100 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
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
            min={task.dueDate < todayKey() ? undefined : todayKey()}
            onChange={(event) => setDueDate(event.target.value)}
            aria-label="Gorev tarihi"
            className="h-10 w-full rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3 text-sm font-medium text-slate-100 outline-none transition [color-scheme:dark] focus:border-teal-400 focus:ring-2 focus:ring-teal-900"
          />
        </label>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={cancelEditing}
            title="Duzenlemeyi iptal et"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <X className="h-4 w-4" />
          </button>
          <button
            type="submit"
            title="Degisiklikleri kaydet"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500 text-slate-950 transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <Save className="h-4 w-4" />
          </button>
        </div>
      </form>
    )
  }

  return (
    <article className="grid gap-3 rounded-lg border border-slate-800 bg-slate-950 p-4 shadow-sm shadow-black/20 sm:grid-cols-[44px_1fr_auto]">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        title={task.completed ? 'Tamamlandi' : 'Tamamla'}
        className={task.completed
          ? 'flex h-11 w-11 items-center justify-center rounded-lg border border-teal-400 bg-teal-500 text-slate-950 transition focus:outline-none focus:ring-2 focus:ring-teal-400'
          : 'flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-500 transition hover:border-teal-400 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400'}
      >
        <Check className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h3
          className={task.completed
            ? 'break-words text-base font-semibold tracking-normal text-slate-500 line-through'
            : 'break-words text-base font-semibold tracking-normal text-slate-100'}
        >
          {task.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-md bg-slate-800 px-2 py-1 text-slate-300">
            {formatDisplayDate(task.dueDate)}
          </span>
          <span className="rounded-md bg-blue-950 px-2 py-1 text-blue-300">
            {task.difficulty}
          </span>
          <span className="rounded-md bg-amber-950 px-2 py-1 text-amber-300">
            +{task.xp} XP
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={startEditing}
          title="Gorevi duzenle"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-teal-500 hover:bg-teal-950 hover:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onRemove(task.id)}
          title="Gorevi sil"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-rose-500 hover:bg-rose-950 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
