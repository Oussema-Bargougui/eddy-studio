interface Props {
  school?: string
  year?: string
}

/** EduCap's mark next to the product name, as on the board. */
export function Brand({ school, year }: Props) {
  return (
    <div className="flex items-center gap-3.5">
      <img src="/educap-icon.png" alt="EduCap" width={42} height={42} className="h-[42px] w-[42px]" />
      <div className="flex flex-col">
        <span className="font-display text-xl font-semibold tracking-[-0.01em]">Eddy Studio</span>
        {school && (
          <span className="text-xs text-ink-soft">
            {school}
            {year ? ` · ${year}` : ''}
          </span>
        )}
      </div>
    </div>
  )
}
