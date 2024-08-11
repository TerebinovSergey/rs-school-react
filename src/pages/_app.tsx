import type { AppProps } from 'next/app';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { wrapper } from '../store/store';
import { Provider } from 'react-redux';
import '../global.css';
import Layout from '../components/layout/Layout';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
