import type { NpmPackage } from '@api/types'
import styles from '@components/npm-package-card.module.css'

export function NpmPackageCard({ package: npmPackage }: NpmPackage) {
  return (
    <li className={styles['npm-package-card']} key={npmPackage.name}>
      <a className={styles['npm-package-name']} href={npmPackage.links.npm} target="tab">
        {npmPackage.name}
      </a>
      <p className={styles['npm-package-description']}>
        {npmPackage.description ?? <em>No description</em>}
      </p>
    </li>
  )
}
