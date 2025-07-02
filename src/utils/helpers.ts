import { LabData } from '../types/data';

// Helper to parse floor token into desired label
export const parseFloor = (token: string): string => {
    const lower = token.toLowerCase();
    if (lower.startsWith('g')) return 'GF'; // ground floor variants: g/f, gf, ground
    const match = lower.match(/(\d)/);
    return match ? match[1] : 'Unknown';
};

// Calculate numeric sums for lab data
export const calculateSum = (data: LabData[], key: string): number => {
    return data.reduce((acc, lab) => acc + (Number(lab[key]) || 0), 0);
};

// Process lab data and extract floors
export const processLabData = (unit: Record<string, any>) => {
    const labs: LabData[] = [];
    const floorSet = new Set<string>();

    Object.entries(unit).forEach(([lab, details]) => {
        const loc = details['Floor/Wing Location'] ?? [];
        const tokens: string[] = Array.isArray(loc) ? loc : [loc];
        const floorNumbers = Array.from(new Set(tokens.map(parseFloor)));
        const primary = floorNumbers[0] || 'Unknown';        const labObj = {
            Lab: lab,
            Floors: floorNumbers,
            PrimaryFloor: primary,
            ...(details as object),
        } as LabData;
        labs.push(labObj);
        floorNumbers.forEach((f) => floorSet.add(f));
    });

    const ordered = ['GF', '1', '2', '3', '4', '5'];
    const floors = ordered.filter((f) => floorSet.has(f));

    return { rackData: labs, floors };
};

// Format percentage for display
export const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
};

// Format floor number with suffix
export const formatFloorNumber = (floor: string): string => {
    if (floor === 'GF') return 'Ground Floor';
    const suffixes = {
        '1': 'st',
        '2': 'nd',
        '3': 'rd',
        default: 'th'
    };
    const suffix = suffixes[floor] || suffixes.default;
    return `${floor}${suffix} Floor`;
};
