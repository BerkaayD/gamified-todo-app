import { CalendarClock } from 'lucide-react'
import type { Difficulty, TodoTask } from '../types/todo'
import { TaskItem } from './TaskItem'

type UpcomingTasksProps = {
  tasks: TodoTask[]
  onToggleTask: (taskId: string) => void
  onRemoveTask: (taskId: string) => void
  onEditTask: (
    taskId: string,
    title: string,
    difficulty: Difficulty,
    dueDate: string,
  ) => void
}

export function UpcomingTasks({
  tasks,
  onToggleTask,
  onRemoveTask,
  onEditTask,
}: UpcomingTasksProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm shadow-black/30">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-950 text-blue-300">
          <CalendarClock className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">Planlanan gorevler</p>
          <h2 className="text-2xl font-bold tracking-normal text-white">
            Gelecek tarihler
          </h2>
        </div>
      </div>

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
            Ileri tarihli gorev bulunmuyor.
          </div>
        )}
      </div>
    </section>
  )
}
