import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  icon: LucideIcon
  label: string
  value: number
  colorClass: string
}

export function StatCard({ icon: Icon, label, value, colorClass }: StatCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
      <Icon className={`mx-auto h-5 w-5 ${colorClass}`} />
      <p className="mt-1 text-xs font-medium text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
