/** The log of validated actions; empty until the first scenario is run against EduCap. */
export function JournalPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="m-0 font-display text-[clamp(34px,4vw,54px)] font-normal tracking-[-0.02em]">Journal des actions</h1>
      <p className="m-0 max-w-[640px] rounded-[var(--radius-card)] bg-paper p-8 text-base leading-relaxed text-ink-soft">
        Chaque action validée dans un scénario apparaîtra ici, avec ce qui a été écrit dans EduCap et la possibilité de l'annuler quand
        EduCap le permet.
      </p>
    </div>
  )
}
