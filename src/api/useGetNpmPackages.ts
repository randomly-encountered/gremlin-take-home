import { type QueryFunctionContext, useQuery } from '@tanstack/react-query'
import { NpmPackage } from '@api/types'

function getUrl(params: string) {
  return `https://api.npms.io/v2/search/suggestions?${params}`
}

const packagesQueryKey = (queryString: string) =>
  ['packages', queryString] as const

async function getNpmPackages({
  queryKey: [, queryString],
}: QueryFunctionContext<ReturnType<typeof packagesQueryKey>>) {
  const searchParams = new URLSearchParams({ q: queryString })
  const urlWithSearchParams = getUrl(searchParams.toString())

  return fetch(urlWithSearchParams, {
    headers: getQueryHeaders(),
    method: 'GET',
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as NpmPackage[]
    } else {
      throw new Error('Encountered network error')
    }
  })
}

export function useGetNpmPackages(
  queryString: string,
  options?: { enabled: boolean },
) {
  return useQuery({
    enabled: !!queryString && (options?.enabled ?? true),
    queryKey: packagesQueryKey(queryString),
    queryFn: getNpmPackages,
  })
}

function getQueryHeaders() {
  const headers = new Headers()
  headers.set('Accept', 'application/json')
  headers.set('Cache-Control', 'no-cache')
  headers.set('Content-Type', 'application/json')
  headers.set('Host', 'api.npms.io')

  return headers
}
