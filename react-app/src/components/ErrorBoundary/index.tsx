import React from 'react';
import { ErrorParams } from '@/index.d.ts';
import { addErrorRecord } from '@/service/systemService';

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

    /**
     * 捕获渲react的错误
     * @param error 记录错误聚合信息和stack
     * @param info 记录 componentStack
     */
    componentDidCatch(error, info) {
        this.handleError('componentDidCatch', {
            message: error.message,
            stack: error.stack,
            origin: info.componentStack
        });
    }

    componentDidMount() {
        window.addEventListener('error', (errorEvent) => {
            this.handleError('error', errorEvent);
        }, true);
        // 捕获 promise 错误
        window.addEventListener('unhandledrejection', (errorEvent) => {
            this.handleError('unhandledrejection', errorEvent);
        }, true);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;;
        }
        return this.props.children;
    }

    setErrorType = (message: string) => {
        let type = 'unkonwn error';
        if (message.includes('SyntaxError')) {
            type = 'SyntaxError';
        } else if (message.includes('ReferenceError')) {
            type = 'ReferenceError';
        } else if (message.includes('404')) {
            type = 'Request404';
        } else if (message.includes('500')) {
            type = 'Request500';
        }
        return type;
    }

    handleError = (type: string, data: any) => {
        let errorParams: ErrorParams = {
            project: 'YLONELY-GROWUP-React'
        };
        switch (type) {
            case 'error':
                errorParams['username'] = 'yh';
                errorParams['path'] = data.target.origin;
                errorParams['referrer'] = document.referrer;
                errorParams['event'] = 'error';
                errorParams['level'] = 1;
                errorParams['stack'] = data.error.stack;
                errorParams['message'] = data.message;
                errorParams['useragent'] = data.target.navigator.userAgent;
                errorParams['network'] = JSON.stringify(data.target.navigator.connection.effectiveType);
                errorParams['appversion'] = data.target.navigator.appVersion;
                errorParams['type'] = this.setErrorType(data.message);
                break;
            case 'unhandledrejection':
                errorParams['username'] = 'yh';
                errorParams['path'] = data.target.origin;
                errorParams['referrer'] = document.referrer;
                errorParams['event'] = 'unhandledrejection';
                errorParams['level'] = 1;
                errorParams['stack'] = data.reason.stack;
                errorParams['message'] = data.reason.message;
                errorParams['useragent'] = data.target.navigator.userAgent;
                errorParams['network'] = JSON.stringify(data.target.navigator.connection.effectiveType);
                errorParams['appversion'] = data.target.navigator.appVersion;
                errorParams['type'] = this.setErrorType(data.reason.stack);
                errorParams['origin'] = data.reason.config ? JSON.stringify(data.reason.config) : '';
                break;
            case 'componentDidCatch':
                errorParams['username'] = 'yh';
                errorParams['path'] = document.location.origin;
                errorParams['referrer'] = document.referrer;
                errorParams['event'] = 'componentDidCatch';
                errorParams['level'] = 1;
                errorParams['stack'] = data.stack;
                errorParams['message'] = data.message;
                errorParams['useragent'] = window.navigator.userAgent;
                // @ts-ignore
                errorParams['network'] = JSON.stringify(window.navigator.connection.effectiveType);
                errorParams['appversion'] = window.navigator.appVersion;
                errorParams['type'] = this.setErrorType(data.stack);
                errorParams['origin'] = data.origin;
                break;
            default:
                break;
        }

        // 用于控制添加错误本身请求错误
        const stopLabel = errorParams.origin && String(errorParams.origin).includes('catchErrors');
        console.log(stopLabel);
        addErrorRecord(errorParams, stopLabel);
    }
}

export default ErrorBoundary;