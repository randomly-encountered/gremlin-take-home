import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { NpmPackageCard } from '@core/components/npm-package-card'
import type { NpmPackage } from '@api/types'

const PACKAGE_TEST_DATA = {
  name: 'test-package',
  scope: 'test-scope',
  version: '1.0.0',
  description: 'Test description',
  keywords: ['foo', 'bar'],
  date: 'sample date',
  links: {
    npm: 'https://www.testdomain.com',
    homepage: 'https://www.testdomain.com',
    repository: 'https://www.testdomain.com',
    bugs: 'https://www.testdomain.com',
  },
  author: {
    email: 'someauthor@abc.com',
    name: 'Test Author',
    username: 'test_author',
  },
  publisher: {
    email: 'somepublisher@abc.com',
    name: 'Test Publisher',
    username: 'test_publisher',
  },
  maintainers: [],
} as NpmPackage['package']

describe('NpmPackageCard component', () => {
  test('Should render a title and a description', () => {
    render(<NpmPackageCard {...PACKAGE_TEST_DATA} />)

    expect(screen.getByRole('link')).toHaveTextContent(PACKAGE_TEST_DATA.name)
    expect(screen.getByRole('paragraph')).toHaveTextContent(PACKAGE_TEST_DATA.description)
  })

  test('Should contain a link which redirects to the package\'s NPM page', async () => {
    render(<NpmPackageCard {...PACKAGE_TEST_DATA} />)

    const link = screen.getByRole('link')
    await userEvent.click(link)

    expect(link).toHaveAttribute('href', PACKAGE_TEST_DATA.links.npm)
    expect(link).toHaveAttribute('target', 'tab')
  })
})
