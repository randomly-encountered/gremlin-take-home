interface Contributor {
  email: string
  name?: string
  username: string
}

// As observed from the endpoint response
// Documentation: https://api-docs.npms.io/#api-Search-SearchSuggestions
export interface NpmPackage {
  package: {
    name: string
    scope: string
    version: string
    description: string
    keywords: string[]
    date: string
    links: {
      npm: string
      homepage: string
      repository: string
      bugs: string
    }
    author: Contributor
    publisher: Contributor
    maintainers: Contributor[]
  }
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
  highlight: string
}

export interface UseGetNpmPackagesOptions {
  enabled?: boolean
  queryString: string
  simulateError?: boolean
}
