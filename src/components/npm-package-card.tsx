import type { NpmPackage } from '@api/types'
import { Tag } from '@components/tag'
import styles from '@components/npm-package-card.module.css'

export function NpmPackageCard({ package: npmPackage }: NpmPackage) {
  return (
    <li className={styles['npm-package-card']} key={npmPackage.name}>
      <div className={styles['title']}>
        <a className={styles['name']} href={npmPackage.links.npm} target="tab">
          {npmPackage.name}
        </a>
        <em className={styles['version']}>{npmPackage.version}</em>
      </div>
      <p className={styles['description']}>
        {npmPackage.description ?? <em>No description</em>}
      </p>
      {npmPackage.keywords && (
        <ul className={styles['keywords']}>
          {npmPackage.keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}
        </ul>
      )}
    </li>
  )
}
