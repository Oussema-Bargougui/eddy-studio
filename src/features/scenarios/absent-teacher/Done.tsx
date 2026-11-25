import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { buttonClass } from '@/ui/button'
import { HandNote } from '@/ui/HandNote'
import { CheckIcon } from '@/ui/icons'
import type { PreviewLine } from '../wizard/PreviewPanel'

/** After "Valider": what was written, and where to undo it. */
export function Done({ lines }: { lines: PreviewLine[] }) {
  return (
    <div className="mx-auto flex max-w-[720px] flex-col items-start gap-6 px-6 py-16">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="grid h-16 w-16 place-items-center rounded-full bg-ok text-white"
      >
        <CheckIcon size={30} />
      </motion.span>
      <h1 className="m-0 font-display text-[clamp(32px,3.6vw,48px)] font-normal tracking-[-0.02em]">C'est fait. Jeudi est couvert.</h1>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[15px]">
        {lines.map((l) => (
          <li key={l.label} className="flex items-start gap-2.5">
            <CheckIcon size={18} className="mt-0.5 shrink-0 text-ok" />
            {l.label}
          </li>
        ))}
      </ul>
      <HandNote rotate={-2} delay={0.6}>
        20 minutes de gagnées
      </HandNote>
      <div className="flex flex-wrap gap-3">
        <Link to="/" className={buttonClass('ink', 'lg')}>
          Retour au briefing
        </Link>
        <Link to="/journal" className={buttonClass('outline', 'lg')}>
          Voir dans le Journal (annulable)
        </Link>
      </div>
    </div>
  )
}
