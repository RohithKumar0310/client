import React from 'react';
import { Box, Text, Spinner } from 'grommet';
import { Alert } from 'grommet-icons';
import { THEME_COLORS } from '../../utils/constants';

interface LoadingStateProps {
    isLoading: boolean;
    error: Error | null;
    children: React.ReactNode;
    loadingText?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    isLoading,
    error,
    children,
    loadingText = 'Loading...'
}) => {
    if (isLoading) {
        return (
            <Box align="center" justify="center" pad="large" gap="medium">
                <Spinner />
                <Text color={THEME_COLORS.TEXT.SECONDARY}>{loadingText}</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box align="center" justify="center" pad="large" gap="medium">
                <Alert color="status-critical" size="large" />
                <Text color={THEME_COLORS.TEXT.PRIMARY} weight="bold">Error</Text>
                <Text color={THEME_COLORS.TEXT.SECONDARY}>{error.message}</Text>
            </Box>
        );
    }

    return <>{children}</>;
};
