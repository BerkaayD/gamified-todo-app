import { CalendarCheck } from 'lucide-react'
import { XP_PER_LEVEL } from '../constants/game'
import type { LevelInfo } from '../types/todo'

type LevelSummaryProps = {
  levelInfo: LevelInfo
}

export function LevelSummary({ levelInfo }: LevelSummaryProps) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm shadow-black/30">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-950 text-amber-300">
          <CalendarCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-400">Level ilerlemesi</p>
          <h2 className="text-2xl font-bold tracking-normal text-white">
            {levelInfo.xpIntoLevel}/{XP_PER_LEVEL} XP
          </h2>
        </div>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-amber-500 transition-all"
          style={{ width: `${levelInfo.progress}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-slate-400">
        Sonraki level icin {levelInfo.xpToNext} XP daha gerekiyor.
      </p>
    </section>
  )
}
