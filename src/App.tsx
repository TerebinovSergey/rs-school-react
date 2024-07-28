import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter.tsx';
import './App.css';
import Header from './components/header/Header.tsx';
import { useTheme } from './contexts/ThemeContext.ts';

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`app-wrapper ${theme}`}>
        <div className="app">
          <Header />
          <AppRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
