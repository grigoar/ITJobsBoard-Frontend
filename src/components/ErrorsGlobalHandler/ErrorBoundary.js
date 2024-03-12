import React from 'react';
import ErrorFallback from './ErrorFallback/ErrorFallback';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // * Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    // * Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  // * use Sentry.captureMessage(err, 'error') in components to send only the error message
  // * use fatal error when the error is not caught in the components
  componentDidCatch(_error, _errorInfo) {
    // You can use your own error logging service here
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/usage/set-level/
    // The exception has the event level set by the scope (info).
    // Sentry.captureException(new Error('custom error'));
  }

  render() {
    // * Check if the error is thrown
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
