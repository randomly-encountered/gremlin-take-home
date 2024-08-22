import { type PropsWithChildren } from 'react'
import styles from '@components/tag.module.css'

export function Tag({ children }: PropsWithChildren) {
  return <li className={styles['tag']}>{children}</li>
}
