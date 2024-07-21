import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
