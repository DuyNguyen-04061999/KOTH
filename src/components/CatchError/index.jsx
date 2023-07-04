import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    componentDidMount() {
      this.startErrorLog();
    }
  
    startErrorLog() {
      window.onerror = (message, file, line, column, errorObject) => {
        window.location.reload()
      };
    }

    static getDerivedStateFromError(error) {
      
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
     
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary