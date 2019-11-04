import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    // 捕获渲染阶段的错误
    componentDidCatch(error, info) {
        console.log('catch', error, info);
    }

    componentDidMount() {
        window.addEventListener('error', (errorEvent) => {
            console.log('error', errorEvent);
        }, true);
        // 捕获 promise 错误
        window.addEventListener('unhandledrejection', (errorEvent) => {
            console.log('unhandledrejection', errorEvent);
        }, true);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;