import { Component, ReactNode, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.css';

type ErrorBoundaryProps = {
  children?: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1 className={styles.title}>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
