import { SearchInput } from '@components/search-input'
import { useState } from 'react'
import { useGetNpmPackages } from 'src/api/useGetNpmPackages'
import styles from '@/app.module.css'
import { ErrorNotifier } from 'src/components/error-notifier'
import { PackageResult } from 'src/components/npm-package-card'

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
            ? data.map(PackageResult)
            : <ErrorNotifier>No results found.</ErrorNotifier>}
        </ul>
      )}
    </main>
  )
}
