import type { NpmPackage } from '@api/types'
import { Tag } from '@core/components/tag/tag'
import styles from '@components/npm-package-card/npm-package-card.module.css'

/**
 * A formatted card representaton of an NPM package suggestion.
 *
 * Each card contains
 * - A name, which links to the package's NPM page,
 * - A description when available
 * - The latest package version
 * - Metadata tag list
 */
export function NpmPackageCard({ name, links, version, description, keywords }: NpmPackage['package']) {
  return (
    <li className={styles['npm-package-card']} key={name}>
      <div className={styles['title']}>
        <a className={styles['name']} href={links.npm} target='tab'>
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
