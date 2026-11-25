import type { Lesson } from '@/api/types'
import { Eyebrow } from '@/ui/Card'

/** Step 1's side panel: what Eddy found in EduCap for this teacher and date. */
export function FoundPanel({ teacherName, lessons, loading }: { teacherName?: string; lessons: Lesson[]; loading: boolean }) {
  const classes = new Set(lessons.map((l) => l.className)).size
  return (
    <aside
      aria-label="Ce qu'Eddy a trouvé"
      className="flex max-w-[440px] flex-[1_1_320px] flex-col gap-4 border-l border-line bg-paper px-[clamp(16px,2vw,32px)] py-10"
    >
      <Eyebrow>Eddy a trouvé dans EduCap</Eyebrow>
      {loading ? (
        <div aria-busy="true" className="h-60 animate-pulse rounded-2xl bg-sand" />
      ) : (
        <>
          <p className="m-0 font-display text-[26px] leading-tight">
            {lessons.length} cours {teacherName ? `de ${teacherName}` : ''} jeudi 26, dans {classes} classes.
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {lessons.map((l) => (
              <li key={l.id} className="flex items-center gap-3.5 rounded-[14px] bg-cream px-3.5 py-3">
                <span className="w-14 font-display text-lg">{l.time}</span>
                <span className="text-sm">
                  <b>{l.className}</b> · {l.room}
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-[14px] bg-warn-soft p-3.5 text-[13px] leading-normal text-[#5C3800]">
            <b>À savoir :</b> la 7ème B a déjà perdu 5,7 pts de présence en 5 semaines.
          </div>
        </>
      )}
      <span className="mt-auto text-xs text-ink-soft">Source : emploi du temps (planning-events) · lu à 10:41</span>
    </aside>
  )
}
