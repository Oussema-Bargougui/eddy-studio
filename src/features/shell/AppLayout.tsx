import { Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/cn'
import { useEmbed } from '../embed/session'
import { EddyLauncher } from './EddyLauncher'
import { TopBar } from './TopBar'

/**
 * Pages with the top bar and the Eddy launcher (everything but a running scenario).
 * Inside EduCap, the right edge stays free for EduCap's own floating buttons
 * (accessibility, settings, chat).
 */
export function AppLayout() {
  const embedded = useEmbed((s) => s.embedded)
  return (
    <div
      className={cn(
        'min-h-dvh bg-cream pt-5 pb-[72px] pl-[clamp(16px,3vw,40px)] text-ink',
        embedded ? 'pr-[76px]' : 'pr-[clamp(16px,3vw,40px)]',
      )}
    >
      <div className="mx-auto flex max-w-[1360px] flex-col gap-9">
        <TopBar />
        <main>
          <Outlet />
        </main>
      </div>
      <EddyLauncher />
    </div>
  )
}
