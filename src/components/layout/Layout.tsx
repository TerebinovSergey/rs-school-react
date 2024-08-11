import React, { ReactNode } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../header/Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div className={`app-wrapper ${theme}`}>
      <div className="app">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
