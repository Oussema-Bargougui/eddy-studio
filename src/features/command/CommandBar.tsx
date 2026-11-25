import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from '@tanstack/react-router'
import { Command } from 'cmdk'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAttendanceTheme, useScenarioCatalogue } from '@/api/queries'
import { SearchIcon, SparkIcon } from '@/ui/icons'
import { ui, useUi } from '../shell/uiStore'
import { CommandItem } from './CommandItem'

/** One bar for everything: find, understand (Eddy), act (scenarios). */
export function CommandBar() {
  const { t } = useTranslation()
  const open = useUi((s) => s.commandOpen)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const scenarios = useScenarioCatalogue().data?.scenarios ?? []
  const classes = useAttendanceTheme().data?.classes ?? []

  const close = () => {
    ui.setCommandOpen(false)
    setSearch('')
  }
  const go = (action: () => void) => {
    close()
    action()
  }
  const question = search.trim() || 'Quelles classes ont le plus d’absences ?'

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (o ? ui.setCommandOpen(true) : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-night/80" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-[90px] left-1/2 z-50 w-[min(680px,calc(100vw-32px))] -translate-x-1/2 overflow-hidden rounded-[26px] bg-paper shadow-[0_50px_100px_-30px_rgb(0_0_0/0.6)]"
        >
          <Dialog.Title className="sr-only">{t('command.label')}</Dialog.Title>
          <Command label={t('command.label')} loop>
            <div className="flex items-center gap-3 border-b border-sand px-[22px] py-[18px] text-ink-soft">
              <SearchIcon size={20} />
              <Command.Input
                value={search}
                onValueChange={setSearch}
                placeholder={t('command.placeholder')}
                className="flex-1 border-none bg-transparent text-xl text-ink outline-none placeholder:text-ink-faint"
              />
              <kbd className="rounded-md border border-line px-2 py-0.5 font-sans text-xs font-semibold">Échap</kbd>
            </div>
            <Command.List className="max-h-[440px] overflow-y-auto p-2.5">
              <Command.Empty className="px-3 py-6 text-sm text-ink-soft">{t('command.empty')}</Command.Empty>
              <Command.Group heading={t('command.scenarios')}>
                {scenarios.map((s) => (
                  <CommandItem
                    key={s.id}
                    value={`scenario ${s.title}`}
                    icon="▶"
                    tone="brand"
                    label={s.title}
                    hint={s.badge ? `${s.badge.label} · ≈ ${s.saves} gagnées` : `≈ ${s.saves} gagnées`}
                    onSelect={() => go(() => void navigate({ to: '/scenario/$scenarioId', params: { scenarioId: s.id } }))}
                  />
                ))}
              </Command.Group>
              <Command.Group heading={t('command.ask')}>
                <CommandItem
                  value={`eddy ${search}`}
                  forceMount
                  icon={<SparkIcon size={16} />}
                  tone="night"
                  label={`« ${question} »`}
                  hint="Analyse à la demande"
                  onSelect={() => go(() => ui.openEddy(question))}
                />
              </Command.Group>
              <Command.Group heading={t('command.goTo')}>
                {classes.map((c) => (
                  <CommandItem
                    key={c.classId}
                    value={`classe ${c.className}`}
                    icon={c.classId}
                    tone="sand"
                    label={`${c.className} — fiche classe`}
                    hint={`${c.rate.toLocaleString('fr-FR', { minimumFractionDigits: 1 })} % de présence`}
                    onSelect={() =>
                      go(() => void navigate({ to: '/explorer/$theme', params: { theme: 'presence' }, search: { classe: c.classId } }))
                    }
                  />
                ))}
                <CommandItem
                  value="page présence thème"
                  icon="%"
                  tone="sand"
                  label="Présence — thème"
                  hint="Courbes par classe, jour, heure"
                  onSelect={() => go(() => void navigate({ to: '/explorer/$theme', params: { theme: 'presence' } }))}
                />
              </Command.Group>
            </Command.List>
            <div className="border-t border-sand px-[22px] py-3 text-xs text-ink-soft">{t('command.hints')}</div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
