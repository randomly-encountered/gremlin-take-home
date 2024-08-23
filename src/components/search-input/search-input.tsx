import { type ChangeEventHandler, type MouseEventHandler, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import loaderIcon from '@assets/loader.svg'
import styles from '@components/search-input/search-input.module.css'

const DEBOUNCE_TIME = 300

interface SearchInputProps {
  isLoading?: boolean
  onChange: (value: string) => void
}

/**
 * An textarea with built-in loading indicators, query debouncing and value clearance.
 */
export function SearchInput({ isLoading, onChange }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>()
  const [value, setValue] = useState('')

  const clearValue: MouseEventHandler<HTMLButtonElement> = () => {
    onChange('')
    setValue('')
    inputRef.current?.focus()
  }

  // Maintain input value in state in-sync with input.
  // Otherwise, debounce upstream onChange handlers
  const handleValueChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget }) => {
    setValue(currentTarget.value)

    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onChange(currentTarget.value)
    }, DEBOUNCE_TIME)
  }

  return (
    <div
      className={styles['search-input-container']}
      role='search'
    >
      <input
        className={styles['search-input']}
        placeholder='Search packages'
        ref={inputRef}
        type='text'
        value={value}
        onChange={handleValueChange}
      />
      {isLoading
        ? <img alt='loading...' className={styles['loading-icon']} role='progressbar' src={loaderIcon} />
        : <Icon className={styles['search-icon']} fontSize={20} icon='mdi:search' />}
      <button className={styles['clear-button']} disabled={!value} onClick={clearValue}>
        <Icon className={styles['clear-icon']} fontSize={16} icon='mdi:close' />
      </button>
    </div>
  )
}
