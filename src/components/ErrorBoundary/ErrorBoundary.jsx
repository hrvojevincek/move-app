import React from 'react';
import './ErrorBoundary.scss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <div className="error-content">
            <h2>Something went wrong!</h2>
            <p>{this.state.error.message}</p>
            <button className="error-button" onClick={() => window.location.reload()}>
              Try again
            </button>
            <button className="error-button" onClick={() => (window.location.href = '/')}>
              Go to home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
