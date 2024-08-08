'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import store from '../../store/store';

const App = dynamic(() => import('../../App'), { ssr: false });

export function ClientOnly() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  );
}
