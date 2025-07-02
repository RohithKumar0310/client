export const METRIC_GROUPS = {
    SUMMARY: [
        { label: "Total", fields: ["Total Racks", "Total Lab Area (sqft)"], icon: "Aggregate" },
        { label: "Active", fields: ["Active Racks", "Active Lab Area (sqft)"], icon: "Action" },
        { label: "Dormant", fields: ["Dormant Racks", "Dormant Lab Area (sqft)"], icon: "Drawer" }
    ]
};

export const FLOOR_ORDER = ['GF', '1', '2', '3', '4', '5'];

export const THEME_COLORS = {
    SUCCESS: '#01a982',
    WARNING: '#ffbc44',
    ERROR: '#fc5a5a',
    BRAND: '#00739d',
    TEXT: {
        PRIMARY: 'dark-1',
        SECONDARY: 'dark-3',
        WEAK: 'text-weak'
    }
};

export const CHART_CONFIG = {
    STROKE_DASH_ARRAY: '3 3',
    STROKE_GRID_COLOR: '#e5e7eb',
    OPACITY: {
        AREA_FILL: 0.6
    }
};

export const STATUS_INDICATORS = {
    COMPLIANT: 'compliant',
    PENDING: 'pending'
} as const;
