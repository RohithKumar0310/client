import React, { useState } from 'react';
import { Box, Heading, Tabs, Tab, Text, Button, Card, CardHeader, CardBody } from 'grommet';
import { FormPreviousLink } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import AssetTab from '@/components/AssetTab';
import RackSpaceTab from '@/components/RackSpaceTab';
import PowerTab from '@/components/PowerTab';
import NetworkTab from '@/components/NetworkTab';
import SecurityTab from '@/components/SecurityTab';
import ESGTab from '@/components/ESGTab';

interface LabDetailProps {
  labName: string;
}
interface AssetStats {
  total: number;
  active: number;
  inactive: number;
}
import { sampleData } from '../Data/sample';

const TAB_KEYS = ['Asset', 'Space', 'Power', 'Network', 'Security', 'ESG'] as const;
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

type TabKey = (typeof TAB_KEYS)[number];
const StatCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => (
  <Card
    background="light-1"
    pad={'medium'}
    elevation="small"
    round="small"
    width={'medium'}
    gap={'small'}
  >
    <CardHeader justify='center' pad={'none'}>
      <Heading  weight={600} color={'dark-1'} >
        {label}
      </Heading>
    </CardHeader>
    <CardBody pad={'none'}>
      <Text size="xxlarge" weight={700} color={color || 'dark-2'} alignSelf='center'>
        {value}
      </Text>
    </CardBody>
  </Card>
);
const LabDetail: React.FC<LabDetailProps> = ({ labName }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('Asset');

  const renderTabContent = (key: TabKey) => {
    switch (key) {
      case 'Asset':
        return <AssetTab />;
      case 'Space':
        return <RackSpaceTab />;
      case 'Power':
        return <PowerTab />;
      case 'Network':
        return <NetworkTab />;
      case 'Security':
        return <SecurityTab />;
      case 'ESG':
        return <ESGTab />;
      default:
        return null;
    }
  };
  const assetStats = calculateAssetStats();

  const { total, active, inactive } = assetStats;

  return (
    <Box pad={{ vertical: 'medium', horizontal: 'medium' }} gap="medium">
      {/* Lab heading */}
      <Box direction="row" justify='between' width="100%">
        <Text size="xxlarge" weight={700} color="dark-1">
          Compute Business Unit - {labName}
        </Text>
        <Button
          label="Back"
          onClick={() => navigate(-1)}
          primary
          icon={<FormPreviousLink />}
          style={{ borderRadius: '25px' }}
        />
      </Box>
      <Box direction="row" justify='around'>
        <StatCard label="Total Assets" value={total} />
        <StatCard label="Active Assets" value={active} color="status-ok" />
        <StatCard label="Inactive Assets" value={inactive} color="status-critical" />
      </Box>


      {/* Tab navigation */}
      <Tabs
        alignSelf="start"
        activeIndex={TAB_KEYS.indexOf(activeTab)}
        onActive={(index) => setActiveTab(TAB_KEYS[index])}
      >
        {TAB_KEYS.map((key) => (
          <Tab key={key} title={key} />
        ))}
      </Tabs>

      {/* Tab content */}
      <Box background="background" pad="medium" round="small" border={{ color: 'border', size: 'xsmall' }}>
        {renderTabContent(activeTab)}
      </Box>
    </Box>
  );
};

export default LabDetail