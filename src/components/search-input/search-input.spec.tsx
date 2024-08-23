import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { SearchInput } from '@core/components/search-input'

describe('SearchInput component', () => {
  test ('Should render a search input with a clear button', () => {
    render(<SearchInput onChange={vi.fn()} />)

    const input = screen.getByRole('textbox')
    const clear = screen.getByRole('button')

    expect(input).toBeInTheDocument()
    expect(clear).toBeInTheDocument()
  })

  test('Should trigger a debounced onChange event when input value changes', async () => {
    const onChange = vi.fn()

    render(<SearchInput onChange={onChange} />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'foo')

    await expect.poll(() => input).toHaveValue('foo')
    await expect.poll(() => onChange).toHaveBeenCalledWith('foo')
  })

  test('Should clear input value when clear button is clicked', async () => {
    const onChange = vi.fn()

    render(<SearchInput onChange={onChange} />)

    const input = screen.getByRole('textbox')
    const clear = screen.getByRole('button')

    await userEvent.type(input, 'foo')
    await userEvent.click(clear)

    await expect.poll(() => input).toHaveValue('')
    await expect.poll(() => onChange).toHaveBeenCalledWith('')
  })
})
