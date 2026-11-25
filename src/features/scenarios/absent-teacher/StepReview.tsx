import type { PreviewLine } from '../wizard/PreviewPanel'

/** Step 5 — the last look before "Valider": the same list as the panel, in full. */
export function StepReview({ lines }: { lines: PreviewLine[] }) {
  return (
    <div className="flex flex-col gap-[22px]">
      <div>
        <h1 className="m-0 font-display text-[clamp(30px,3.2vw,44px)] font-normal tracking-[-0.02em]">Tout est prêt</h1>
        <p className="mt-2 mb-0 max-w-[640px] text-[15px] text-ink-soft">
          Vérifiez une dernière fois. En validant, Eddy écrit ces éléments dans EduCap, dans cet ordre, puis relit pour confirmer.
        </p>
      </div>
      <ol className="m-0 flex list-none flex-col gap-3 p-0">
        {lines.map((l, i) => (
          <li key={l.label} className="flex items-start gap-4 rounded-[20px] bg-paper px-5 py-4 shadow-[0_1px_0_var(--color-line)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-brand">{i + 1}</span>
            <span className="pt-1 text-[15px]">{l.label}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
