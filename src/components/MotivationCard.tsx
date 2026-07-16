import { Sparkles } from 'lucide-react'
import { motivationMessages } from '../constants/game'

type MotivationCardProps = {
  perfectDay: boolean
  dailyMessage: string
}

export function MotivationCard({ perfectDay, dailyMessage }: MotivationCardProps) {
  return (
    <section className="rounded-lg border border-teal-900 bg-teal-950 p-5 shadow-sm shadow-black/30">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-teal-300">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-teal-200">Gunluk tebrik</p>
          <h2 className="mt-1 text-xl font-bold tracking-normal text-white">
            {perfectDay ? 'Mukemmel gun!' : 'Bitise yaklasiyorsun'}
          </h2>
          <p className="mt-2 text-sm leading-6 text-teal-100">
            {perfectDay
              ? dailyMessage || motivationMessages[0]
              : 'Tum gorevleri tamamladiginda seri sayacin artar ve motivasyon mesaji acilir.'}
          </p>
        </div>
      </div>
    </section>
  )
}
