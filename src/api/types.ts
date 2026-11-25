/**
 * The shapes the screens consume. Every field is something EduCap can really
 * provide (see the data map); the EduCap source will map its responses onto them.
 */

export type Tone = 'ok' | 'bad' | 'warn' | 'neutral'

export interface SchoolContext {
  schoolName: string
  schoolYear: string
  userName: string
  userFirstName: string
  userInitials: string
  /** When the data was read from EduCap (ISO). */
  readAt: string
  now: string
  /** The school's time zone (EduCap gives it per user); dates are shown in it, not the browser's. */
  timeZone: string
}

export interface Figure {
  id: string
  label: string
  value: number
  digits: number
  unit: '' | '%'
  sub: string
  tone: Tone
  /** Handwritten margin note, computed from the data. */
  note?: string
}

export interface WeekPoint {
  label: string
  rate: number
  lastYear: number
}

export interface Todo {
  id: string
  priority: 'urgent' | 'watch'
  title: string
  detail: string
  action: { label: string; scenarioId: string }
}

export interface ClassTrend {
  classId: string
  className: string
  /** Current attendance rate (%). */
  rate: number
  /** Oldest to newest, one value per week. */
  series: number[]
}

export interface CollectionPoint {
  label: string
  thisYear: number
  lastYear: number
}

export interface TodayItem {
  time: string
  text: string
}

export interface Briefing {
  context: SchoolContext
  headline: { before: string; highlight: string; after: string; note: string }
  figures: Figure[]
  attendance: {
    title: string
    headline: string
    weeks: WeekPoint[]
    band: [number, number]
    note: string
    source: string
  }
  todos: Todo[]
  drops: ClassTrend[]
  stableCount: number
  classCount: number
  collection: { currency: string; headline: string; points: CollectionPoint[]; note: string }
  today: TodayItem[]
}

export interface WeekdayRate {
  day: string
  rate: number
}

export interface JustifiedMonth {
  month: string
  justified: number
  unjustified: number
}

export interface AttendanceTheme {
  periodLabel: string
  threshold: number
  weekLabels: string[]
  school: number[]
  classes: ClassTrend[]
  weekdays: WeekdayRate[]
  justified: JustifiedMonth[]
  source: string
}

export interface ClassFile {
  classId: string
  className: string
  levelLabel: string
  rate: number
  delta: number
  pupils: number
  headTeacher: string
  hoursAbsent: number
  hoursUnjustified: number
  mostAbsent: { name: string; hours: number; unjustified: number }[]
  note: string
  source: string
}

export type ScenarioGroup = 'daily' | 'regular' | 'period'

export interface ScenarioSummary {
  id: string
  group: ScenarioGroup
  icon: string
  title: string
  desc: string
  steps: number
  saves: string
  badge?: { label: string; tone: Tone }
  featured?: boolean
  available: boolean
}

export interface Teacher {
  id: string
  name: string
  initials: string
  subject: string
  weeklyHours: number
}

export interface Lesson {
  id: string
  date: string
  time: string
  className: string
  subject: string
  room: string
}

export interface SubstituteChoice {
  lessonId: string
  options: { id: string; label: string }[]
  /** Eddy's suggestion; absent when nobody is free. */
  suggestedId?: string
}

export interface EddyAnswer {
  question: string
  steps: string[]
  headline: string
  /** Plain text; **double stars** mark emphasis. */
  body: string
  chart?: { title: string; bars: { label: string; value: number; highlight?: boolean }[] }
  sources: string[]
  scenario?: { id: string; title: string }
  suggestions: string[]
}
