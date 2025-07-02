import React from 'react';
import { Box, Card, CardBody, CardHeader, Heading, Text } from 'grommet';

interface AssetStats {
  total: number;
  active: number;
  inactive: number;
}

import { sampleData } from '../Data/sample';

// Calculate real stats from sample data
function calculateAssetStats(): AssetStats {
  let total = 0;
  let active = 0;

  // Sum up all racks from each lab
  Object.values(sampleData.Compute).forEach((lab) => {
    total += lab['Total Lab Assets (racks)'] || 0;
    active += lab['Active Assets (racks)'] || 0;
  });

  return {
    total,
    active,
    inactive: total - active,
  };
}

const assetStats = calculateAssetStats();

const StatCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => (
  <Card
    background="light-1"
    pad={{ vertical: 'medium', horizontal: 'large' }}
    elevation="small"
    round="small"
    flex='grow'
    gap="xsmall"
  >
    <CardHeader justify='center'>
      <Heading size="small" weight={600} color={'dark-1'} >
        {label}
      </Heading>
    </CardHeader>
    <CardBody>
      <Text size="xxlarge" weight={700} color={color || 'dark-2'} alignSelf='center'>
        {value}
      </Text>
    </CardBody>
  </Card>
);

const AssetTab: React.FC = () => {
  const { total, active, inactive } = assetStats;

  return (
    <Box direction="row" gap="medium" wrap>
      <StatCard label="Total Assets" value={total} />
      <StatCard label="Active Assets" value={active} color="status-ok" />
      <StatCard label="Inactive Assets" value={inactive} color="status-critical" />
    </Box>
  );
};

export default AssetTab;