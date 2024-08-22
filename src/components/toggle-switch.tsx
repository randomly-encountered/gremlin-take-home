import styles from '@components/toggle-switch.module.css'

interface ToggleSwitchProps {
  isChecked: boolean
  label?: string
  onChange: (checkedState: boolean) => void
}

export function ToggleSwitch({ isChecked, label, onChange }: ToggleSwitchProps) {
  const className = [styles['control'], isChecked && styles['checked']].filter(Boolean).join(' ')

  const handleClick = () => {
    onChange(!isChecked)
  }

  return (
    <div className={styles['toggle-switch']} onClick={handleClick}>
      <label className={styles['label']}>{label}</label>
      <button aria-checked={isChecked} className={className} role="switch" />
    </div>
  )
}
