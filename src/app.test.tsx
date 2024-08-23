import { describe, expect, test } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { App } from '@core/App'

const renderHarness = () => {
  const client = new QueryClient()

  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>,
  )
}

async function renderWithIniitalQuery(queryString: string) {
  renderHarness()

  const input = screen.getByRole('textbox')

  await userEvent.type(input, queryString)

  return { input }
}

describe('App component', () => {
  test('Should show a list of packages when a search phrase is entered', async () => {
    const queryString = 'react'

    await renderWithIniitalQuery(queryString)

    const results = await waitFor(() => screen.findAllByRole('listitem'), { timeout: 10000 })

    expect(results.length).toBeGreaterThan(0)
    expect(results.some((result) => {
      const npmLink = within(result).getByRole('link')
      return npmLink.textContent?.includes(queryString)
    })).toBe(true)
  })

  test('Clearing the input should clear the search results', async () => {
    const queryString = 'react'

    await renderWithIniitalQuery(queryString)

    const searchContainer = screen.getByRole('search')
    const closeBtn = within(searchContainer).getByRole('button')

    expect(closeBtn).toBeInTheDocument()
    expect(closeBtn).not.toHaveAttribute('disabled')

    await userEvent.click(closeBtn)

    const results = await waitFor(() => screen.queryAllByRole('listitem'))

    expect(results.length).toBe(0)
  })

  test('Should display an error message if there are no query results', async () => {
    const queryString = 'some-random-garbling-nonsense-that-would-never-match-anything-real'

    await renderWithIniitalQuery(queryString)

    const results = await waitFor(() => screen.queryAllByRole('listitem'))
    const notifier = await waitFor(() => screen.getByRole('alert'))

    expect(results.length).toBe(0)
    expect(notifier).toBeInTheDocument()
  })

  test('Should throw an error if the \'Simulate error\' toggle is checked', async () => {
    renderHarness()

    const queryString = 'react'
    const input = screen.getByRole('textbox')
    const toggle = screen.getByRole('switch')

    await userEvent.click(toggle)
    await userEvent.type(input, queryString)

    const results = await waitFor(() => screen.queryAllByRole('listitem'), { timeout: 10000 })
    const notifier = await waitFor(() => screen.findByRole('alert'), { timeout: 10000 })

    expect(results.length).toBe(0)
    expect(notifier).toBeInTheDocument()
  })
})
