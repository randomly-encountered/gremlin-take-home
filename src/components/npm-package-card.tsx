import type { NpmPackage } from '@api/types'
import { Tag } from '@components/tag'
import styles from '@components/npm-package-card.module.css'

export function NpmPackageCard({ name, links, version, description, keywords }: NpmPackage['package']) {
  return (
    <li className={styles['npm-package-card']} key={name}>
      <div className={styles['title']}>
        <a className={styles['name']} href={links.npm} target="tab">
          {name}
        </a>
        <em className={styles['version']}>{version}</em>
      </div>
      <p className={styles['description']}>
        {description ?? <em>No description</em>}
      </p>
      {keywords && (
        <ul className={styles['keywords']}>
          {keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}
        </ul>
      )}
    </li>
  )
}
