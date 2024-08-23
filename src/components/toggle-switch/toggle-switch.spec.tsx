import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ToggleSwitch } from '@core/components/toggle-switch'
import { describe } from 'vitest'

describe('ToggleSwitch component', () => {
  test.each([
    { isChecked: false, description: 'unchecked' },
    { isChecked: true, description: 'checked' },
  ])('ToggleSwitch should initially render with a $description state', ({ isChecked }) => {
    render(<ToggleSwitch isChecked={isChecked} onChange={vi.fn()} />)

    const toggle = screen.getByRole('switch')

    expect(toggle).toHaveAttribute('aria-checked', String(isChecked))
  })

  test.each([
    { isChecked: false, description: 'unchecked' },
    { isChecked: true, description: 'checked' },
  ])('ToggleSwitch should invoke onChange when clicked with a $description state', async ({ isChecked }) => {
    const onChange = vi.fn().mockReturnValueOnce(!isChecked)

    render(<ToggleSwitch isChecked={isChecked} onChange={onChange} />)

    const toggle = screen.getByRole('switch')
    await userEvent.click(toggle)

    await expect.poll(() => toggle).toHaveAttribute('aria-checked', String(!onChange.mock.results[0].value))
  })

  test('ToggleSwitch should render a label when provided', () => {
    render(<ToggleSwitch isChecked={false} label='Test label' onChange={vi.fn()} />)

    expect(screen.getByText('Test label')).toBeInTheDocument()
  })
})
