import { Flame, Star, Trophy } from 'lucide-react'
import type { PlayerStats } from '../types/todo'
import { formatDisplayDate, todayKey } from '../utils/date'
import { StatCard } from './StatCard'

type HeaderStatsProps = {
  stats: PlayerStats
  level: number
}

export function HeaderStats({ stats, level }: HeaderStatsProps) {
  const currentDateLabel = formatDisplayDate(todayKey())

  return (
    <header className="flex flex-col gap-4 rounded-lg border border-slate-800 bg-slate-900 px-5 py-5 shadow-sm shadow-black/30 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-teal-300">
          Gamified TODO
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-white sm:text-4xl">
          Bugunun gorevlerini XP'ye donustur
        </h1>
        <p className="mt-3 text-sm font-medium capitalize text-slate-400">
          {currentDateLabel}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <StatCard icon={Trophy} label="Level" value={level} colorClass="text-amber-600" />
        <StatCard
          icon={Star}
          label="Toplam XP"
          value={stats.totalXp}
          colorClass="text-blue-600"
        />
        <StatCard
          icon={Flame}
          label="Seri"
          value={stats.streak}
          colorClass="text-rose-600"
        />
      </div>
    </header>
  )
}
