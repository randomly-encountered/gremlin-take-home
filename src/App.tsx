import { useState } from 'react'
import { useGetNpmPackages } from '@api/useGetNpmPackages'
import { ErrorNotifier } from '@core/components/error-notifier/error-notifier'
import { NpmPackageCard } from '@core/components/npm-package-card/npm-package-card'
import { SearchInput } from '@core/components/search-input/search-input'
import { SearchResultPlaceholder } from '@core/components/search-result-placeholder/search-result-placeholder'
import { ToggleSwitch } from '@core/components/toggle-switch/toggle-switch'
import styles from '@core/app.module.css'

export function App() {
  const [queryString, setQueryString] = useState('')
  const [shouldSimulateError, setShouldSimulateError] = useState(false)
  const { data, error, isError, isFetched, isLoading, isSuccess } = useGetNpmPackages({ queryString, simulateError: shouldSimulateError })

  return (
    <main className={styles['app-container']}>
      <div className={styles['app-toolbar']}>
        <h1 className={styles['app-title']}>NPM Package Search</h1>
        <ToggleSwitch
          isChecked={shouldSimulateError}
          label='Simulate error'
          onChange={setShouldSimulateError}
        />
      </div>
      <div className={styles['search-input-container']}>
        <SearchInput isLoading={isLoading} onChange={setQueryString} />
      </div>
      {!isLoading && !isFetched && <SearchResultPlaceholder />}
      {!isLoading && isError && (
        <div className={styles['notifier-container']}>
          <ErrorNotifier>{error.message}</ErrorNotifier>
        </div>
      )}
      {isSuccess && (
        /* Render results as a list of cards. Capped at a limit of 10 results */
        <ul className={styles['search-results-list']} role='feed'>
          {data.length
            ? data.map(({ package: npmPackage }) =>
              <NpmPackageCard key={npmPackage.name} {...npmPackage} />)
            : <ErrorNotifier>No results found</ErrorNotifier>}
        </ul>
      )}
    </main>
  )
}
