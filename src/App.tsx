import { useState } from 'react'
import { useGetNpmPackages } from '@api/useGetNpmPackages'
import { ErrorNotifier } from '@components/error-notifier'
import { NpmPackageCard } from '@components/npm-package-card'
import { SearchInput } from '@components/search-input'
import { ToggleSwitch } from '@components/toggle-switch'
import styles from '@/app.module.css'

export default function App() {
  const [queryString, setQueryString] = useState('')
  const [shouldSimulateError, setShouldSimulateError] = useState(false)
  const { data, error, isError, isLoading, isSuccess } = useGetNpmPackages({ queryString, simulateError: shouldSimulateError })

  return (
    <main className={styles['app-container']}>
      <div className={styles['app-toolbar']}>
        <h1 className={styles['app-title']}>NPM Package Search</h1>
        <ToggleSwitch
          isChecked={shouldSimulateError}
          label="Simulate error"
          onChange={setShouldSimulateError}
        />
      </div>
      <div className={styles['search-input-container']}>
        <SearchInput isLoading={isLoading} onChange={setQueryString} />
      </div>
      {!isLoading && isError && (
        <div className={styles['notifier-container']}>
          <ErrorNotifier>{error.message}</ErrorNotifier>
        </div>
      )}
      {isSuccess && (
        <ul className={styles['search-results-list']} role="feed">
          {data.length
            ? data.map(NpmPackageCard)
            : <ErrorNotifier>No results found</ErrorNotifier>}
        </ul>
      )}
    </main>
  )
}
