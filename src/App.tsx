import { useState } from 'react'
import { useGetNpmPackages } from '@api/useGetNpmPackages'
import { ErrorNotifier } from '@components/error-notifier'
import { NpmPackageCard } from '@components/npm-package-card'
import { SearchInput } from '@components/search-input'
import styles from '@/app.module.css'

export default function App() {
  const [queryString, setQueryString] = useState('')
  const { data, error, isError, isLoading, isSuccess } = useGetNpmPackages(queryString)

  return (
    <main className={styles['app-container']}>
      <SearchInput isLoading={isLoading} onChange={setQueryString} />
      {isError && <ErrorNotifier>{error.message}</ErrorNotifier>}
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
