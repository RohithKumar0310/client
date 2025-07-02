// Common interfaces for data structures
export interface LabData {
    Lab: string;
    Floors: string[];
    PrimaryFloor: string;
    'Total Lab Assets (racks)': number;
    'Total Lab Area (sqft)': number;
    'Active Assets (racks)': number;
    'Active Lab Area (sqft)': number;
    'Dormant Assets (racks)': number;
    'Dormant Lab Area (sqft)': number;
    'Floor/Wing Location': string[];
    'Top Owners': string;
    [key: string]: any;
}

export interface UtilizationData {
    category: string;
    current: number;
    capacity: number;
}

export interface NetworkData {
    time: string;
    bandwidth: number;
    latency: number;
    uptime: number;
}

export interface ComplianceItem {
    name: string;
    status: 'compliant' | 'pending';
    lastAudit: string;
}

export interface PowerData {
    time: string;
    usage: number;
    renewable: number;
}

export interface PUEData {
    month: string;
    pue: number;
}

export interface WasteData {
    name: string;
    value: number;
    color: string;
}

export interface QuickStat {
    title: string;
    value: string;
    description: string;
    change: string;
    changeType: 'increase' | 'decrease' | 'neutral';
}
