import { type PropsWithChildren } from 'react'
import styles from '@/components/error-notifier.module.css'

export function ErrorNotifier({ children }: PropsWithChildren) {
  return (
    <div className={styles['error-notifier']}>
      {children}
    </div>
  )
}
