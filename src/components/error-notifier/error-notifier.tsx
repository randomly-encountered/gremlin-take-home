import { type PropsWithChildren } from 'react'
import styles from '@components/error-notifier/error-notifier.module.css'

/**
 * renders an inline message with clear warning visual indicators
 */
export function ErrorNotifier({ children }: PropsWithChildren) {
  return (
    <div className={styles['error-notifier']} role='alert'>
      {children}
    </div>
  )
}
