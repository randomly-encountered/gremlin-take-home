import styles from '@components/toggle-switch/toggle-switch.module.css'

interface ToggleSwitchProps {
  isChecked: boolean
  label?: string
  onChange: (checkedState: boolean) => void
}
/**
 * A component intended to display and control boolean states
 */
export function ToggleSwitch({ isChecked, label, onChange }: ToggleSwitchProps) {
  const className = [styles['control'], isChecked && styles['checked']].filter(Boolean).join(' ')

  const handleClick = () => {
    onChange(!isChecked)
  }

  return (
    <label className={styles['toggle-switch']}>
      {label ?? null}
      <button aria-checked={isChecked} className={className} role='switch' onClick={handleClick} />
    </label>
  )
}
