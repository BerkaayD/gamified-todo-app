export const todayKey = () => new Date().toISOString().slice(0, 10)

export const yesterdayKey = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

export const formatDisplayDate = (dateKey: string) =>
  new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(new Date(`${dateKey}T00:00:00`))
