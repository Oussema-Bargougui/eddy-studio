import type { AttendanceTheme, ClassFile, ClassTrend } from '../types'

const rates: Record<string, number> = {
  '1ère A': 94.0, '1ère B': 93.3, '1ère C': 97.9, '2ème A': 96.7, '2ème B': 94.2, '2ème C': 94.6,
  '3ème A': 93.8, '3ème B': 95.4, '3ème C': 93.5, '4ème A': 94.9, '4ème B': 96.0, '4ème C': 96.3,
  '5ème A': 98.3, '5ème B': 95.5, '6ème A': 94.1, '6ème B': 95.6, '7ème A': 97.7, '7ème B': 89.0,
  '7ème C': 95.8, '8ème A': 95.5, '8ème B': 93.4, '8ème C': 94.0, '9ème A': 91.4, '9ème B': 97.0,
}

const explicit: Record<string, number[]> = {
  '7ème B': [94.7, 93.4, 92.1, 90.8, 89.0],
  '9ème A': [94.8, 94.1, 93.0, 92.2, 91.4],
}

/** Small, stable wobble around the current rate (deterministic per class). */
function seriesFor(name: string, rate: number): number[] {
  const fixed = explicit[name]
  if (fixed) return fixed
  const seed = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return [0, 1, 2, 3].map((i) => Math.round((rate + (((seed * (i + 3)) % 13) - 6) / 10) * 10) / 10).concat(rate)
}

const idOf = (name: string) => name.replace(/[^0-9A-Z]/g, '')

export const demoClasses: ClassTrend[] = Object.entries(rates).map(([className, rate]) => ({
  classId: idOf(className),
  className,
  rate,
  series: seriesFor(className, rate),
}))

export const demoAttendance: AttendanceTheme = {
  periodLabel: '5 dernières semaines',
  threshold: 92,
  weekLabels: ['S44', 'S45', 'S46', 'S47', 'cette sem.'],
  school: [95.3, 95.1, 95.4, 95.0, 94.2],
  classes: demoClasses,
  weekdays: [
    { day: 'Lun', rate: 4.8 },
    { day: 'Mar', rate: 4.1 },
    { day: 'Mer', rate: 3.6 },
    { day: 'Jeu', rate: 4.3 },
    { day: 'Ven', rate: 7.9 },
    { day: 'Sam', rate: 5.2 },
  ],
  justified: [
    { month: 'sept.', justified: 310, unjustified: 120 },
    { month: 'oct.', justified: 420, unjustified: 190 },
    { month: 'nov.', justified: 380, unjustified: 240 },
  ],
  source: "registre d'appel (MCP get_attendance_report) · lu à 10:38",
}

export const demoClassFiles: Record<string, ClassFile> = {
  '7B': {
    classId: '7B',
    className: '7ème B',
    levelLabel: 'Classe · 7ème année',
    rate: 89.0,
    delta: -5.7,
    pupils: 27,
    headTeacher: 'M. Ayari',
    hoursAbsent: 38,
    hoursUnjustified: 21,
    mostAbsent: [
      { name: 'Yassine T.', hours: 14, unjustified: 9 },
      { name: 'Lina B.', hours: 9, unjustified: 6 },
      { name: 'Omar K.', hours: 7, unjustified: 0 },
    ],
    note: 'tous absents le vendredi après-midi',
    source: 'absences du bulletin (appels + déclarations directes), 1er trimestre',
  },
}

/** Any other class gets a plain file built from its trend. */
export function classFileFor(classId: string): ClassFile {
  const known = demoClassFiles[classId]
  if (known) return known
  const trend = demoClasses.find((c) => c.classId === classId) ?? demoClasses[0]!
  const first = trend.series[0] ?? trend.rate
  return {
    classId: trend.classId,
    className: trend.className,
    levelLabel: `Classe · ${trend.className.split(' ')[0]} année`,
    rate: trend.rate,
    delta: Math.round((trend.rate - first) * 10) / 10,
    pupils: 25,
    headTeacher: '—',
    hoursAbsent: Math.round((100 - trend.rate) * 6),
    hoursUnjustified: Math.round((100 - trend.rate) * 2),
    mostAbsent: [],
    note: '',
    source: 'absences du bulletin (appels + déclarations directes), 1er trimestre',
  }
}
