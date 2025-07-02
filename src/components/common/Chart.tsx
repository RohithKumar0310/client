import React from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';
import { CHART_CONFIG } from '../../utils/constants';

interface ChartProps {
    data: any[];
    height?: number;
    type: 'line' | 'area';
    dataKey: string;
    xAxisKey?: string;
    color?: string;
    additionalKeys?: { key: string; color: string }[];
}

export const Chart: React.FC<ChartProps> = ({
    data,
    height = 200,
    type = 'line',
    dataKey,
    xAxisKey = 'time',
    color = '#01a982',
    additionalKeys = []
}) => {    const ChartComponent = type === 'line' ? LineChart : AreaChart;
    const renderDataComponent = (key: string, color: string) => {
        if (type === 'line') {
            return (
                <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                />
            );
        }
        return (
            <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={CHART_CONFIG.OPACITY.AREA_FILL}
            />
        );
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <ChartComponent data={data}>
                <CartesianGrid
                    strokeDasharray={CHART_CONFIG.STROKE_DASH_ARRAY}
                    stroke={CHART_CONFIG.STROKE_GRID_COLOR}
                />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip />                {renderDataComponent(dataKey, color)}
                {additionalKeys.map(({ key, color }) => renderDataComponent(key, color))}
            </ChartComponent>
        </ResponsiveContainer>
    );
};
