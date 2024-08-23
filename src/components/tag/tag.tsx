import { type PropsWithChildren } from 'react'
import styles from '@components/tag/tag.module.css'

/**
 * A simple representation of metadata associated with a resource
 * intended to be rendered within the context of a list element
 */
export function Tag({ children }: PropsWithChildren) {
  return <li className={styles['tag']}>{children}</li>
}
