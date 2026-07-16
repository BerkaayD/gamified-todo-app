import { ListChecks } from 'lucide-react'
import type { DashboardMetrics } from '../types/todo'

type ProgressSummaryProps = {
  metrics: DashboardMetrics
}

export function ProgressSummary({ metrics }: ProgressSummaryProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm shadow-black/30">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-950 text-teal-300">
          <ListChecks className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">Bugunku ilerleme</p>
          <h2 className="text-2xl font-bold tracking-normal text-white">
            %{metrics.completionRate}
          </h2>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${metrics.completionRate}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-400">
        {metrics.completedCount}/{metrics.totalCount} gorev tamamlandi, bugun{' '}
        {metrics.dailyXp}/{metrics.totalPossibleXp} XP toplandi.
      </p>
    </section>
  )
}
