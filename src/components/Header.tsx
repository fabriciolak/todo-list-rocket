import styles from './Header.module.css'

import logoImage from '../assets/todo-logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img
        src={logoImage}
        alt="Todo logo project"
      />
    </header>
  )
}