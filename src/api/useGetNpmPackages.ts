import { type QueryFunctionContext, useQuery } from '@tanstack/react-query'
import type { NpmPackage, UseGetNpmPackagesOptions } from '@api/types'

const FETCH_OPTIONS = {
  headers: getQueryHeaders(),
  method: 'GET',
}

const packagesQueryKey = (query: {
  queryString: string
  simulateError?: boolean
}) => [{ key: 'packages', ...query }] as const

// Responsible for the actual data fetching. Size is set to return 10 results.
async function getNpmPackages({
  queryKey: [{ queryString, simulateError }],
}: QueryFunctionContext<ReturnType<typeof packagesQueryKey>>) {
  const searchParams = new URLSearchParams({
    q: simulateError ? '' : queryString,
    size: '10',
  })
  const urlWithSearchParams = getUrlWithSearchParams(searchParams.toString())

  return fetch(urlWithSearchParams, FETCH_OPTIONS)
    .then((response) => {
      if (response.ok) return response
      throw new Error('Encountered a network error while fetching suggestions')
    })
    .then(async (response) => (await response.json()) as NpmPackage[])
}

// Consume query results within a reactive scope given the provided param options
export function useGetNpmPackages({
  enabled = true,
  queryString,
  simulateError = false,
}: UseGetNpmPackagesOptions) {
  return useQuery({
    enabled: !!queryString && enabled,
    queryKey: packagesQueryKey({ queryString, simulateError }),
    queryFn: getNpmPackages,
    // The exponential back-off and default retries count is painfully long to wait for
    // when we are simulating an error via UI toggle. Configure this to 1 retry when simulated.
    retry: simulateError ? 1 : 3,
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

function getUrlWithSearchParams(params: string) {
  return `https://api.npms.io/v2/search/suggestions?${params}`
}
