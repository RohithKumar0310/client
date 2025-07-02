import { Box, Text, Card as GrommetCard } from 'grommet';
import React, { ReactNode } from 'react';
import { THEME_COLORS } from '../../utils/constants';

interface MetricCardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    pad?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    icon,
    children,
    pad = 'medium'
}) => {
    return (
        <GrommetCard background="background-back" elevation="small" round="small">
            <Box pad={pad}>
                <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
                    {icon && React.cloneElement(icon as any, { color: THEME_COLORS.BRAND })}
                    <Text size="large" weight={600} color={THEME_COLORS.TEXT.PRIMARY}>
                        {title}
                    </Text>
                </Box>
                {children}
            </Box>
        </GrommetCard>
    );
};

interface StatisticDisplayProps {
    label: string;
    value: string | number;
    subtext?: string;
    color?: string;
}

export const StatisticDisplay: React.FC<StatisticDisplayProps> = ({
    label,
    value,
    subtext,
    color = THEME_COLORS.TEXT.PRIMARY
}) => {
    return (
        <Box>
            <Text size="xsmall" color={THEME_COLORS.TEXT.SECONDARY}>
                {label}
            </Text>
            <Text size="large" color={color}>
                {value}
            </Text>
            {subtext && (
                <Text size="xsmall" color={THEME_COLORS.TEXT.WEAK}>
                    {subtext}
                </Text>
            )}
        </Box>
    );
};
