import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, Button } from 'grommet';
import { Alert } from 'grommet-icons';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box align="center" justify="center" pad="large" gap="medium">
                    <Alert size="large" color="status-critical" />
                    <Text size="xlarge" weight="bold">Something went wrong</Text>
                    <Text>{this.state.error?.message || 'An unexpected error occurred'}</Text>
                    <Button
                        label="Reload Page"
                        onClick={() => window.location.reload()}
                        primary
                    />
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
