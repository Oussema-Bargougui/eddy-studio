import { useState } from 'react'
import { useBriefing } from '@/api/queries'
import { QueryBoundary } from '@/ui/QueryBoundary'
import { AttendanceCard } from './AttendanceCard'
import { CollectionCard, DropsCard, TodayCard } from './BottomCards'
import { FigureStrip } from './FigureStrip'
import { Hero } from './Hero'
import { TodoList } from './TodoList'

/** Home page: a short story of the school this morning. */
export function BriefingPage() {
  const query = useBriefing()
  // Changing the key remounts the animated parts, replaying counters and ink.
  const [take, setTake] = useState(0)

  return (
    <QueryBoundary query={query} skeletonHeight={640}>
      {(b) => (
        <div key={take} className="flex flex-col gap-9">
          <Hero briefing={b} onReplay={() => setTake((n) => n + 1)} />
          <FigureStrip figures={b.figures} />
          <div className="flex flex-wrap items-stretch gap-6">
            <AttendanceCard attendance={b.attendance} year={b.context.schoolYear} />
            <TodoList todos={b.todos} />
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <DropsCard briefing={b} />
            <CollectionCard collection={b.collection} />
            <TodayCard items={b.today} />
          </div>
        </div>
      )}
    </QueryBoundary>
  )
}
