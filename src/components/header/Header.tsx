import { useTheme } from '../../contexts/ThemeContext.ts';
import styles from './Header.module.css';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>The Star Wars</h1>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Theme' : 'Light Theme'}
      </button>
    </div>
  );
}

export default Header;
