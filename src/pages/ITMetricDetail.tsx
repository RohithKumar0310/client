import React, { useState, useMemo } from "react";
import { Box, Text, Button, Card, CardHeader, CardBody } from "grommet";
import { useParams, useNavigate, Link } from "react-router-dom";
import { sampleData } from "../Data/sample";
import { Drawer, FormPreviousLink, Action, Aggregate, Compass, UserManager } from "grommet-icons";

// helper to parse floor token into desired label
const parseFloor = (token: string): string => {
    const lower = token.toLowerCase();
    if (lower.startsWith("g")) return "GF"; // ground floor variants: g/f, gf, ground
    const match = lower.match(/(\d)/);
    return match ? match[1] : "Unknown";
};

interface LabData {
    Lab: string;
    Floors: string[]; // e.g. ["1","2"] or ["GF"]
    PrimaryFloor: string;
    [key: string]: any;
}

const ITMetricDetail = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [selectedLabs, setSelectedLabs] = useState<Set<string>>(new Set());
    const [selectedFloors, setSelectedFloors] = useState<Set<string>>(new Set());
    const title = decodeURIComponent(category ?? "");

    // Handle floor click to navigate to 2D view
    const handleFloorClick = (floor: string, direction: string) => {
        navigate(`/datacenter-2d/${direction}?floor=${encodeURIComponent(floor)}`);
    };

    const handleLabClick = (lab: string, ) => {
        navigate(`/labs/${lab}`);
    };

    // Groups for multi-lab summary view
    const summaryGroups: { label: string; fields: string[]; icon: any }[] = [
        { label: "Total", fields: ["Total Racks", "Total Lab Area (sqft)"], icon: <Aggregate size="large" /> },
        { label: "Active", fields: ["Active Racks", "Active Lab Area (sqft)"], icon: <Action size="large" /> },
        { label: "Dormant", fields: ["Dormant Racks", "Dormant Lab Area (sqft)"], icon: <Drawer size="large" /> },
    ];

    // Get data for the current business unit
    const unit = (sampleData as any)[title] ?? {};

    // Process lab data and extract unique floors
    const { rackData, floors } = useMemo(() => {
        const labs: LabData[] = [];
        const floorSet = new Set<string>();

        Object.entries(unit).forEach(([lab, details]) => {
            const loc = details["Floor/Wing Location"] ?? [];
            const tokens: string[] = Array.isArray(loc) ? loc : [loc];
            const floorNumbers = Array.from(new Set(tokens.map(parseFloor)));
            const primary = floorNumbers[0] || "Unknown";

            const labObj: LabData = {
                Lab: lab,
                Floors: floorNumbers,
                PrimaryFloor: primary,
                ...(details as object),
            };
            labs.push(labObj);
            floorNumbers.forEach((f) => floorSet.add(f));
        });

        const ordered = ["GF", "1", "2", "3", "4", "5"];
        const floors = ordered.filter((f) => floorSet.has(f));

        return { rackData: labs, floors };
    }, [unit]);

    // Get selected lab data
    const selectedLabData = useMemo(() => {
        if (selectedLabs.size === 0) return null;
        if (selectedLabs.size === 1) {
            return rackData.find(lab => lab.Lab === Array.from(selectedLabs)[0]);
        }
        return null;
    }, [selectedLabs, rackData]);

    // Calculate summary data for multiple selections
    const summaryData = useMemo(() => {
        if (selectedLabs.size === 0) return null;

        const selected = rackData.filter(lab => selectedLabs.has(lab.Lab));
        if (selected.length === 0) return null;

        // Simple sum for numeric fields
        const sum = (key: string) =>
            selected.reduce((acc, lab) => acc + (Number(lab[key]) || 0), 0);

        return {
            "Total Labs": selected.length,
            "Total Racks": sum('Total Lab Assets (racks)'),
            "Total Lab Area (sqft)": sum('Total Lab Area (sqft)'),
            "Active Racks": sum('Active Assets (racks)'),
            "Active Lab Area (sqft)": sum('Active Lab Area (sqft)'),
            "Dormant Racks": sum('Dormant Assets (racks)'),
            "Dormant Lab Area (sqft)": sum('Dormant Lab Area (sqft)'),
        };
    }, [selectedLabs, rackData]);

    // High-level summary for all labs when nothing is selected
    const highLevelData = useMemo(() => {
        const all = rackData;
        if (all.length === 0) return null;
        const sum = (key: string) =>
            all.reduce((acc, lab) => acc + (Number(lab[key]) || 0), 0);
        return {
            "Total Labs": all.length,
            "Total Racks": sum('Total Lab Assets (racks)'),
            "Total Lab Area (sqft)": sum('Total Lab Area (sqft)'),
            "Active Racks": sum('Active Assets (racks)'),
            "Active Lab Area (sqft)": sum('Active Lab Area (sqft)'),
            "Dormant Racks": sum('Dormant Assets (racks)'),
            "Dormant Lab Area (sqft)": sum('Dormant Lab Area (sqft)'),
        };
    }, [rackData]);

    // Handle floor selection
    const toggleFloor = (floor: string) => {
        const newSelectedFloors = new Set(selectedFloors);
        const newSelectedLabs = new Set(selectedLabs);
        const isSelected = newSelectedFloors.has(floor);

        // labs that belong to floor
        const floorLabs = rackData.filter((lab) => lab.Floors.includes(floor));

        if (isSelected) {
            newSelectedFloors.delete(floor);
            floorLabs.forEach((lab) => newSelectedLabs.delete(lab.Lab));
        } else {
            newSelectedFloors.add(floor);
            floorLabs.forEach((lab) => newSelectedLabs.add(lab.Lab));
        }

        setSelectedFloors(newSelectedFloors);
        setSelectedLabs(newSelectedLabs);
    };

    // Handle lab selection
    const toggleLab = (labId: string, labFloors: string[]) => {
        const newSelectedLabs = new Set(selectedLabs);
        const newSelectedFloors = new Set(selectedFloors);

        const isNowSelected = !newSelectedLabs.has(labId);
        if (isNowSelected) {
            newSelectedLabs.add(labId);
        } else {
            newSelectedLabs.delete(labId);
        }

        labFloors.forEach((floor) => {
            const floorLabs = rackData.filter((l) => l.Floors.includes(floor));
            const allSelected = floorLabs.every((l) => newSelectedLabs.has(l.Lab));
            if (allSelected) newSelectedFloors.add(floor);
            else newSelectedFloors.delete(floor);
        });

        setSelectedLabs(newSelectedLabs);
        setSelectedFloors(newSelectedFloors);
    };

    return (
        <Box pad="medium" direction="column" gap="medium" fill>
            {/* Header */}
            <Box direction="row" justify='between' width="100%">
                <Text size="xxlarge" weight={700} color="dark-1">
                    {title} Business Unit
                </Text>
                <Button
                    label="Back"
                    onClick={() => navigate(-1)}
                    primary
                    icon={<FormPreviousLink />}
                    style={{ borderRadius: '25px' }}
                />
            </Box>

            <Box direction="row" >
                <Box width='60%' >
                    {/* Floor Selection */}
                    <Box >
                        <Text size="large" weight={600} color="dark-1">Floors</Text>
                        <Box pad={{ vertical: 'medium' }} direction="row" wrap gap="small">
                            {floors.map(floor => {
                                const isSelected = selectedFloors.has(floor);
                                const isPartiallySelected = !isSelected &&
                                    rackData.some(lab => lab.Floors.includes(floor) && selectedLabs.has(lab.Lab));
                                return (
                                    <Box
                                        key={floor}
                                        pad={{ horizontal: 'medium', vertical: 'small' }}
                                        background={
                                            isSelected ? 'brand' :
                                                isPartiallySelected ? 'light-4' : 'background-back'
                                        }
                                        round="xsmall"
                                        onClick={() => toggleFloor(floor)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            opacity: isPartiallySelected ? 0.8 : 1,
                                            border: isPartiallySelected ? '2px solid #01A982' : '2px solid transparent',
                                            minWidth: '100px',
                                            textAlign: 'center'
                                        }}
                                        align="center"
                                        justify="center"
                                        hoverIndicator={isSelected ? 'brand' : 'light-2'}
                                    >
                                        <Text
                                            weight={600}
                                            color={isSelected ? 'white' : 'dark-1'}
                                            size="medium"
                                        >
                                            {(floor === '1') ? `${floor}st Floor` : (floor === '2') ? `${floor}nd Floor` : (floor === '3') ? `${floor}rd Floor` : (floor[0] === 'G') ? `Ground Floor` : `${floor}th Floor`}
                                        </Text>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    {/* Lab Selection */}
                    <Box >

                        <Text size="large" weight={600} color="dark-1">Labs</Text>

                        <Box pad={{ vertical: 'medium' }} direction="row" wrap gap="xsmall">
                            {rackData
                                .slice()
                                .sort((a, b) => b['Total Lab Assets (racks)'] - a['Total Lab Assets (racks)'])
                                .map(lab => {
                                    const isSelected = selectedLabs.has(lab.Lab);
                                    return (
                                        <Card
                                            key={lab.Lab}
                                            onClick={() => toggleLab(lab.Lab, lab.Floors)}
                                            background={isSelected ? 'brand' : 'background-back'}
                                            pad="medium"
                                            style={{
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                minWidth: '200px',
                                                flex: 'auto',
                                                border: isSelected ? '2px solid #01A982' : '2px solid transparent',
                                            }}
                                            hoverIndicator={isSelected ? 'brand' : 'light-2'}
                                            margin={'xsmall'}
                                            align="center"
                                            justify="center"
                                        >
                                            <Text weight={600} color={isSelected ? 'white' : 'dark-1'} textAlign="center">
                                                {lab.Lab}
                                            </Text>
                                            <Text size="small" color={isSelected ? 'white' : 'dark-3'} textAlign="center">
                                                {lab['Total Lab Assets (racks)'] || 0} racks
                                            </Text>
                                        </Card>
                                    );
                                })}
                        </Box>
                    </Box>
                </Box>
                <Box width={'40%'}>
                    {selectedLabs.size > 0 ? (
                        <Text size="xlarge" weight={600} color="dark-1" margin={{ horizontal: 'medium' }} >
                            {selectedLabs.size === 1 && selectedLabData ? `${selectedLabData.Lab} ` : `${selectedLabs.size} Labs Selected`}
                          
                            <Text
                                color="brand"
                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLabClick(selectedLabData.Lab)
                                }}
                            >
                                More 
                            </Text>
                        </Text>
                    ) : (
                        <Text size="xlarge" weight={600} color="dark-1" margin={{ horizontal: 'medium' }}>Business Unit Overview</Text>
                    )}
                    <Box pad="medium" gap="small" >
                        {/* Summary Cards */}
                        <Box direction="row" gap="small" >
                            {(selectedLabs.size > 0 ? summaryData : highLevelData) ? (
                                summaryGroups.map((group) => (
                                    <Card
                                        key={group.label}
                                        background="background-back"
                                        elevation="small"
                                        round="small"
                                        pad="medium"
                                    >
                                        <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
                                            {React.cloneElement(group.icon, { color: 'brand' })}
                                            <Text size="large" weight={600} color="dark-1">{group.label}</Text>
                                        </Box>
                                        {group.fields.map((field) => (
                                            <Box key={field} direction="row" justify="between" margin={{ vertical: 'xsmall' }}>
                                                <Text color="dark-3">{field}:</Text>
                                                <Text weight={600} color="dark-1">
                                                    {selectedLabs.size > 0
                                                        ? summaryData?.[field as keyof typeof summaryData] ?? 0
                                                        : highLevelData?.[field as keyof typeof highLevelData] ?? 0}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Card>
                                ))
                            ) : null}
                        </Box>
                        {/* Detailed View for Labs */}
                        {selectedLabs.size > 0 && (
                            <Box gap="small" direction="row">
                                {/* Floors / Locations Card */}
                                <Card background="background-back" elevation="small" round="small" pad="medium" flex='grow'>
                                    <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
                                        <Compass color="brand" />
                                        <Text size="large" weight={600} color="dark-1">Floors / Locations</Text>
                                    </Box>
                                    <Box direction="column" gap="xsmall" align="center">
                                        {(() => {
                                            const allLocations = new Map<string, { floor: string; direction: string }>();

                                            // Helper function to parse location string
                                            const parseLocation = (location: string) => {
                                                const trimmed = location.trim();

                                                // Handle ground floor
                                                if (trimmed.toUpperCase() === 'G/F') {
                                                    return { floor: 'G', direction: 'north' };
                                                }

                                                // Handle patterns like '3rd-South', '1st-North'
                                                const match = trimmed.match(/(\d+)(?:st|nd|rd|th)?[-\s](north|south)/i);
                                                if (match) {
                                                    return {
                                                        floor: match[1],
                                                        direction: match[2].toLowerCase()
                                                    };
                                                }

                                                // Default case
                                                return {
                                                    floor: trimmed,
                                                    direction: 'north' // Default direction
                                                };
                                            };

                                            // Process all locations
                                            rackData
                                                .filter(lab => selectedLabs.has(lab.Lab))
                                                .forEach(lab => {
                                                    const locField = lab["Floor/Wing Location"] ?? lab.Floors;
                                                    const tokens = Array.isArray(locField)
                                                        ? locField
                                                        : locField.toString().split(/[,;]/);
                                                    tokens.forEach(t => {
                                                        allLocations.set(t.trim(), parseLocation(t));
                                                    });
                                                });

                                            // Render location links
                                            return Array.from(allLocations.entries()).map(([location, { floor, direction }], idx) => (
                                                <Text
                                                    key={idx}
                                                    color="brand"
                                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFloorClick(floor, direction as 'north' | 'south');
                                                    }}
                                                >
                                                    {location}
                                                </Text>
                                            ));
                                        })()}
                                    </Box>
                                </Card>
                                {/* Top Owners Card */}
                                <Card background="background-back" elevation="small" round="small" pad="medium" flex='grow'>
                                    <Box direction="row" align="center" gap="small" margin={{ bottom: 'small' }}>
                                        <UserManager color="brand" />
                                        <Text size="large" weight={600} color="dark-1">Top Owners</Text>
                                    </Box>
                                    <Box gap="xsmall" align="center">
                                        {(() => {
                                            const allOwners = new Set<string>();
                                            rackData
                                                .filter(lab => selectedLabs.has(lab.Lab))
                                                .forEach(lab => {
                                                    const owners = lab["Top Owners"];
                                                    if (owners) {
                                                        owners.toString().split(/[;\/]/).forEach(owner => {
                                                            const trimmed = owner.trim();
                                                            if (trimmed) allOwners.add(trimmed);
                                                        });
                                                    }
                                                });
                                            return Array.from(allOwners).map((owner, idx) => (
                                                <Text key={idx} color="dark-3">{owner}</Text>
                                            ));
                                        })()}
                                    </Box>
                                </Card>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default ITMetricDetail