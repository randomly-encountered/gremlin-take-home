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
      <div className={styles['view-controls']}>
        <SearchInput isLoading={isLoading} onChange={setQueryString} />
        <ToggleSwitch
          isChecked={shouldSimulateError}
          label="Simulate error"
          onChange={setShouldSimulateError}
        />
      </div>
      {!isLoading && isError && <ErrorNotifier>{error.message}</ErrorNotifier>}
      {isSuccess && (
        <ul className={styles['search-results-list']}>
          {data.length
            ? data.map(NpmPackageCard)
            : <ErrorNotifier>No results found</ErrorNotifier>}
        </ul>
      )}
    </main>
  )
}
