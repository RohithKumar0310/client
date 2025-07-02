import React, { useState, useRef, useEffect } from 'react';
import floorLayout from '../Data/floor_layout_template.json';
import transformers from '../Data/transformers.json';
import { Box, Text, Button, Heading } from 'grommet';
import { FormPrevious, FormPreviousLink, Home } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';

interface StaticFloorLayoutProps {
    floor: string;
}

const StaticFloorLayout: React.FC<StaticFloorLayoutProps> = ({ floor }) => {
    const navigate = useNavigate();
    const [rackData, setRackData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hovered, setHovered] = useState<null | {
        x: number;
        y: number;
        rowLabel: string;
        colNum: number;
        rackInfo: any;
        staticName?: string;
    }>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    const layout = floorLayout[floor];

    useEffect(() => {
        setLoading(true);
        setError(null);
        console.log(floor);
        let [floorNum, direction] = floor.split('-');
        if (floorNum === '1') {
            floorNum = '1st';
        } else if (floorNum === '2') {
            floorNum = '2nd';
        } else if (floorNum === '3') {
            floorNum = '3rd';
        } else {
            floorNum = `${floorNum}th`;
        }
        fetch(`http://127.0.0.1:8000/api/assets?floor=${floorNum}%20F`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch rack data');
                return res.json();
            })
            .then(data => setRackData(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [floor]);

    if (!layout) return <div>No layout found for floor {floor}</div>;
    if (loading) return <div>Loading rack data...</div>;
    if (error) return <div>Error: {error}</div>;

    const { total_rows, total_columns, row_labels, static_racks } = layout;

    // Map static racks by rack code (e.g., "HDDB0103")
    const staticRackMap: Record<string, string> = {};
    static_racks.forEach((rack: any) => {
        if (rack.row_id && rack.column_id) {
            const col = rack.column_id < 10 ? `0${rack.column_id}` : `${rack.column_id}`;
            staticRackMap[`${rack.row_id}${col}`] = rack.rack_name;
        } else if (rack.location) {
            staticRackMap[rack.location] = rack.rack_name;
        }
    });

    // Map dynamic rack data by rack code
    const rackDataMap: Record<string, any> = {};
    rackData.forEach((rack: any) => {
        if (rack.rack) {
            rackDataMap[rack.rack] = rack;
        }
    });

    const padCol = (col: number) => (col < 10 ? `0${col}` : `${col}`);
    // Legend items
    const legend = [
        { color: '#b3e5fc', label: 'Lab Rack' },
        { color: '#ffe082', label: 'Unused Space' },
        { color: '#eee', label: 'No Information' },
        { color: 'green', label: 'Transformer' },
        { color: 'red', label: 'Pillar' },
    ];

    return (
        <Box>
            {/* Header with back button and title */}
            <Box style={{ position: 'sticky', top: 0, zIndex: 10 }} background="white" pad={'small'}>
                <Box direction="row" width="100%" justify='between'>

                    <Button
                        label="Back"
                        onClick={() => navigate(-1)}
                        primary
                        icon={<FormPreviousLink />}
                        style={{ borderRadius: '25px' }}
                        alignSelf='center'
                    />

                    <Text size="xxlarge" weight='bold' color="dark-1" >
                        Floor {floor} Layout
                    </Text>
                    <Button
                        label="Home"
                        onClick={() => navigate('/')}
                        primary
                        icon={<Home />}
                        style={{ borderRadius: '25px' }}
                        alignSelf='center'
                    />

                </Box>
                <Box gap="small" direction='row' justify='center'>
                    {legend.map((item) => (
                        <Box key={item.label} direction="row" align="center" gap="small">
                            <Box
                                width="20px"
                                height="20px"
                                background={item.color}
                                border={{ color: 'rgba(0,0,0,0.1)' }}
                            />
                            <span>{item.label}</span>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box align="center" direction='column'>
                <Box direction={'row'} >
                    {transformers?.[floor]?.top?.map((transformer: any, idx: number) => (
                        <Box
                            key={transformer.name ?? idx}
                            pad="small"
                            margin="small"
                            background={'green'}
                            align="center"
                            flex='grow'
                            justify="center"
                        >
                            <Text size="small" weight="bold" textAlign='center'>{transformer.name}</Text>
                            <Text size="small" weight="bold" textAlign='center'>R : {transformer.R}</Text>
                            <Text size="small" weight="bold" textAlign='center'>Y : {transformer.Y}</Text>
                            <Text size="small" weight="bold" textAlign='center'>B : {transformer.B}</Text>
                        </Box>
                    ))}
                </Box>
                <Box direction='row'>
                    <Box direction='column' style={{ order: floor?.includes('South') ? 1 : -1 }}>
                        {transformers?.[floor]?.side?.map((transformer: any, idx: number) => (
                            <Box
                                key={transformer.name ?? idx}
                                pad="small"
                                margin="small"
                                flex='grow'
                                background={'green'}
                                align="center"
                                justify="center"
                            >
                                <Text size="small" weight="bold" textAlign='center'>{transformer.name}</Text>
                                <Text size="small" weight="bold" textAlign='center'>R : {transformer.R}</Text>
                                <Text size="small" weight="bold" textAlign='center'>Y : {transformer.Y}</Text>
                                <Text size="small" weight="bold" textAlign='center'>B : {transformer.B}</Text>
                            </Box>
                        ))}
                    </Box>
                    {/* Layout */}
                    <Box>
                        <Box direction="row" gap="xsmall" pad="xsmall" >
                            <Box width="80px" />
                            {Array.from({ length: total_columns }).map((_, colIdx) => (
                                <Box key={colIdx} width="50px" >
                                    <Text weight="bold" textAlign='center'>{floor.endsWith('North') ? (total_columns - colIdx) : (colIdx + 1)}</Text>
                                </Box>
                            ))}
                        </Box>
                        {row_labels.map((rowLabel: string) => (
                            <Box direction="row" key={rowLabel} pad="xsmall" gap={'xsmall'} align="center">
                                <Box width="80px" align="center">
                                    <Text weight="bold">{rowLabel}</Text>
                                </Box>
                                {Array.from({ length: total_columns }).map((_, colIdx) => {
                                    const colNum = floor.endsWith('North') ? (total_columns - colIdx) : (colIdx + 1);
                                    const rackCode = `${rowLabel}${padCol(colNum)}`;
                                    let displayText = 'NaN';
                                    let background = '#eee';
                                    let rackInfo = null;
                                    let staticName = undefined;
                                    if (staticRackMap[rackCode]) {
                                        displayText = staticRackMap[rackCode];
                                        background = staticRackMap[rackCode].toLowerCase() === 'pillar' ? 'red' : '#ffe082';
                                        staticName = staticRackMap[rackCode];
                                    }
                                    if (rackDataMap[rackCode]) {
                                        displayText = rackDataMap[rackCode].labname || rackCode;
                                        background = '#b3e5fc';
                                        rackInfo = rackDataMap[rackCode];
                                    }

                                    return (
                                        <Box
                                            key={colIdx}
                                            width="50px"
                                            height="40px"
                                            background={background}
                                            align="center"
                                            justify="center"
                                            border={{ color: 'light-4' }}
                                            // round="xsmall"
                                            onMouseEnter={e => {
                                                setHovered({
                                                    x: e.clientX,
                                                    y: e.clientY,
                                                    rowLabel,
                                                    colNum,
                                                    rackInfo,
                                                    staticName
                                                });
                                            }}
                                            onMouseLeave={() => setHovered(null)}
                                        >
                                            <Text size="xsmall" textAlign='center'>{displayText}</Text>
                                        </Box>
                                    );
                                })}
                            </Box>
                        ))}
                    </Box>
                    <Box direction='column' style={{ order: floor?.includes('North') ? 1 : -1 }}>
                        <Box
                            pad="small"
                            margin="small"
                            background={'pink'}
                            align="center"
                            flex='grow'
                            justify="center"
                        >
                            <Text size="small" weight="bold" style={{ writingMode: 'sideways-lr' }} textAlign='center'>Walk Way</Text>
                        </Box>
                    </Box>
                </Box>
                {hovered && (
                    <Box
                        ref={popoverRef}
                        style={{
                            position: 'fixed',
                            left: hovered.x + 10,
                            top: hovered.y + 10,
                            zIndex: 1000,
                            minWidth: '200px',
                            maxWidth: '300px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            pointerEvents: 'none',
                            background: 'white',
                            padding: 12
                        }}
                    >
                        <Text weight="bold" size="small">
                            {hovered.rackInfo?.labname || hovered.staticName || 'No Information'}
                        </Text>
                        {hovered.rackInfo && (
                            <>
                                <Text size="small"><strong>Floor:</strong> {hovered.rackInfo.floor.split(' ')[0]}</Text>
                                <Text size="small"><strong>Wing:</strong> {hovered.rackInfo.wing.split(' ')[0]}</Text>
                            </>
                        )}
                        <Text size="small"><strong>Row:</strong> {hovered.rowLabel}</Text>
                        <Text size="small"><strong>Col:</strong> {hovered.colNum}</Text>
                        {hovered.rackInfo && (
                            <>
                                <Text size="small"><strong>Count:</strong> {hovered.rackInfo.count} Assets</Text>
                                <Text size="small"><strong>Space:</strong> {hovered.rackInfo.spaceInU} Units</Text>
                                <Text size="small"><strong>Power:</strong> {hovered.rackInfo.powerInWatts} Watts</Text>
                            </>
                        )}
                    </Box>
                )}
            </Box>

        </Box>
    );
};

export default StaticFloorLayout;