import illustration from '@assets/search-illustration.svg'
import styles from '@components/search-result-placeholder.module.css'

export function SearchResultPlaceholder() {
  return (
    <div className={styles['placeholder']}>
      <img alt="waiting for query" className={styles['illustration']} src={illustration} />
      <span className={styles['subtitle']}>
        Enter a search query to see results
      </span>
    </div>
  )
}
