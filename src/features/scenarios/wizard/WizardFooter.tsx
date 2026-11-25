import { Link } from '@tanstack/react-router'
import { buttonClass } from '@/ui/button'

interface Props {
  step: number
  onBack: () => void
  onNext: () => void
  /** The only way to write to EduCap: an explicit click on "Valider". */
  onConfirm: () => void
  nextLabel?: string
  isLast: boolean
  sending: boolean
}

/**
 * Back / continue at the bottom of each step. No button here is type="submit":
 * a form submission (Enter, or a reused button node) can never write to EduCap.
 * Distinct keys keep React from turning "Continuer" into "Valider" in place.
 */
export function WizardFooter({ step, onBack, onNext, onConfirm, nextLabel, isLast, sending }: Props) {
  return (
    <div className="mt-auto flex flex-wrap justify-between gap-3 border-t border-line pt-[18px]">
      {step === 1 ? (
        <Link to="/scenarios" className={buttonClass('outline', 'lg')}>
          Annuler
        </Link>
      ) : (
        <button type="button" onClick={onBack} className={buttonClass('outline', 'lg')}>
          ← Retour
        </button>
      )}
      {isLast ? (
        <button key="confirm" type="button" onClick={onConfirm} disabled={sending} className={buttonClass('brand', 'lg')}>
          {sending ? 'Écriture dans EduCap…' : 'Valider et écrire dans EduCap'}
        </button>
      ) : (
        <button key="next" type="button" onClick={onNext} className={buttonClass('ink', 'lg')}>
          {nextLabel ?? 'Continuer →'}
        </button>
      )}
    </div>
  )
}
