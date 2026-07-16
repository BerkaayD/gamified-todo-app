import { HeaderStats } from './components/HeaderStats'
import { LevelSummary } from './components/LevelSummary'
import { MotivationCard } from './components/MotivationCard'
import { ProgressSummary } from './components/ProgressSummary'
import { TaskPanel } from './components/TaskPanel'
import { UpcomingTasks } from './components/UpcomingTasks'
import { useGamifiedTodo } from './hooks/useGamifiedTodo'

function App() {
  const {
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
  } = useGamifiedTodo()

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <HeaderStats stats={stats} level={levelInfo.level} />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <TaskPanel
            tasks={todayTasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onRemoveTask={removeTask}
            onEditTask={editTask}
            onResetDay={resetDay}
          />

          <aside className="flex flex-col gap-6">
            <ProgressSummary metrics={metrics} />
            <LevelSummary levelInfo={levelInfo} />
            <MotivationCard
              perfectDay={perfectDay}
              dailyMessage={dailyMessage}
            />
          </aside>
        </section>

        <UpcomingTasks
          tasks={upcomingTasks}
          onToggleTask={toggleTask}
          onRemoveTask={removeTask}
          onEditTask={editTask}
        />
      </div>
    </main>
  )
}

export default App
