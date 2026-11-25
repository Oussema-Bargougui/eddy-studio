import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import type { Todo } from '@/api/types'
import { cn } from '@/lib/cn'

/** "À traiter, par priorité": each item leads straight to its scenario. */
export function TodoList({ todos }: { todos: Todo[] }) {
  const { t } = useTranslation()
  return (
    <aside className="flex min-w-0 flex-[1_1_340px] flex-col gap-3">
      <h2 className="mt-1 mb-0.5 font-display text-[26px] font-normal">{t('briefing.todosTitle')}</h2>
      {todos.map((todo, i) => (
        <motion.div
          key={todo.id}
          className="flex items-start gap-3.5 rounded-[18px] bg-paper px-[18px] py-4 shadow-[0_1px_0_var(--color-line)]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
        >
          <span
            className={cn('mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', todo.priority === 'urgent' ? 'bg-bad' : 'bg-warn')}
            aria-label={todo.priority === 'urgent' ? 'Urgent' : 'À surveiller'}
          />
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[15px] font-semibold">{todo.title}</span>
            <span className="text-[13px] leading-[1.45] text-ink-soft">{todo.detail}</span>
            <Link
              to="/scenario/$scenarioId"
              params={{ scenarioId: todo.action.scenarioId }}
              className="mt-1 text-[13px] font-semibold text-brand no-underline hover:text-brand-deep"
            >
              {todo.action.label} →
            </Link>
          </div>
        </motion.div>
      ))}
    </aside>
  )
}
