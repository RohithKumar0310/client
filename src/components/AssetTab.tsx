import React from 'react';
import { Box, Button, Card, CardBody, CardHeader, Heading, Text, DataTable } from 'grommet';
import * as XLSX from 'xlsx';
import { Download } from 'grommet-icons';

interface AssetStats {
  total: number;
  active: number;
  inactive: number;
}

// Hardcoded asset stats based on recent activity
const assetStats: AssetStats = {
  total: 6, // Total modifications
  active: 4, // Assets added
  inactive: 2, // Assets removed
};

const StatCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => (
  <Card
    background="light-1"
    pad={{ vertical: 'medium', horizontal: 'large' }}
    elevation="small"
    round="small"
    flex='grow'
    gap="small"
  >
    <CardHeader justify='center' pad={'none'}>
      <Heading size="small" weight={600} color={'dark-1'} >
        {label}
      </Heading>
    </CardHeader>
    <CardBody pad={'none'}>
      <Text size="large" weight={700} color={color || 'dark-2'} alignSelf='center'>
        {value}
      </Text>
    </CardBody>
  </Card>
);

interface RecentAsset {
  id: string;
  status: 'Added' | 'Removed';
  asset: string;
  location: string;
  date: string;
}

const recentActivity: RecentAsset[] = [
  { id: '1', status: 'Added', asset: 'Server R45-3', location: '1st-North', date: '2025-07-02 10:15' },
  { id: '2', status: 'Added', asset: 'Storage S12-1', location: '3rd-South', date: '2025-07-02 09:30' },
  { id: '3', status: 'Removed', asset: 'Switch SW2-5', location: '5th-North', date: '2025-07-01 17:00' },
  { id: '4', status: 'Added', asset: 'Server R10-7', location: '2nd-South', date: '2025-07-01 14:20' },
  { id: '5', status: 'Removed', asset: 'Server R33-2', location: '4th-North', date: '2025-06-30 11:05' },
  { id: '6', status: 'Added', asset: 'Firewall FW-1', location: '1st-North', date: '2025-06-30 09:00' },
];

const AssetTab: React.FC = () => {
  const { total, active, inactive } = assetStats;

  const exportToExcel = () => {
    // Create a worksheet from the recentActivity data
    const ws = XLSX.utils.json_to_sheet(recentActivity);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asset Activity');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'asset_activity.xlsx');
  };

  return (
    <Box gap="medium">
      <Box direction='row' justify='between' align='center'>
        <Text weight={600}>Recent Activity</Text>
        <Button
          primary
          icon={<Download />}
          label="Export"
          onClick={exportToExcel}
          gap="small"
          size="small"
        />
      </Box>
      <Box direction="row" gap="medium" wrap>
        <StatCard label="Assets Modified" value={total} />
        <StatCard label="Assets Added" value={active} color="status-ok" />
        <StatCard label="Assets Removed" value={inactive} color="status-critical" />
      </Box>

      <DataTable
        columns={[
          {
            property: 'status',
            header: <Text weight={600}>Status</Text>,
            render: datum => (
              <Text color={datum.status === 'Added' ? 'status-ok' : 'status-critical'}>
                {datum.status}
              </Text>
            ),
          },
          { property: 'asset', header: <Text weight={600}>Asset</Text> },
          { property: 'location', header: <Text weight={600}>Location</Text> },
          { property: 'date', header: <Text weight={600}>Date</Text> },
        ]}
        data={recentActivity}
        primaryKey="id"
        resizeable
      />
    </Box>

  );
};

export default AssetTab;