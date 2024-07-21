import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

describe('Index Component', () => {
  it('renders App component without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });
});
