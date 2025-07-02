import React, { useState } from 'react';
import { Box, Heading, Tabs, Tab, Text, Button } from 'grommet';
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

const TAB_KEYS = ['Asset', 'Space', 'Power', 'Network', 'Security', 'ESG'] as const;

type TabKey = (typeof TAB_KEYS)[number];

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