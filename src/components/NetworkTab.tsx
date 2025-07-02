import React, { useState } from 'react';
import { Box, Select, DataTable, Text, Heading } from 'grommet';

type NetworkCompartment = keyof typeof networkData;

interface SubnetInfo {
  subnet: string;
  ipCount: number;
}

// Realistic datacenter network segments
const networkData: Record<string, SubnetInfo[]> = {
  'LR-0': [
    { subnet: '10.10.1.0/24', ipCount: 240 },
    { subnet: '10.10.2.0/24', ipCount: 180 },
    { subnet: '10.10.3.0/24', ipCount: 210 },
  ],
  'LR-1': [
    { subnet: '10.20.1.0/24', ipCount: 195 },
    { subnet: '10.20.2.0/24', ipCount: 165 },
    { subnet: '10.20.3.0/24', ipCount: 230 },
  ],
  'LR-3': [
    { subnet: '10.30.1.0/24', ipCount: 145 },
    { subnet: '10.30.2.0/24', ipCount: 125 },
  ],
  'LR-4': [
    { subnet: '10.40.1.0/24', ipCount: 180 },
    { subnet: '10.40.2.0/24', ipCount: 150 },
    { subnet: '10.40.3.0/24', ipCount: 195 },
  ],
  'LR-5': [
    { subnet: '10.50.1.0/24', ipCount: 120 },
    { subnet: '10.50.2.0/24', ipCount: 90 },
  ],
};

const compartments = Object.keys(networkData) as Array<keyof typeof networkData>;

const NetworkTab: React.FC = () => {
  const [selectedCompartment, setSelectedCompartment] = useState<NetworkCompartment>('LR-1');

  const subnets = networkData[selectedCompartment];

  return (
    <Box gap="medium">
      {/* Compartment selector */}
      <Box direction='row' gap='small' justify='start'>
      <Heading level={2}>Compartment : </Heading>
      <Select options={compartments} value={selectedCompartment} onChange={({ option }) => setSelectedCompartment(option)} />
      </Box>
      
        
      

      {/* Subnet table */}
      <DataTable
        data={subnets}
        columns={[
          {
            property: 'subnet',
            header: <Text weight={600}>Subnet</Text>,
            primary: true,
          },
          {
            property: 'ipCount',
            header: <Text weight={600}>IP Count</Text>,
          },
        ]}
      />
    </Box>
  );
};

export default NetworkTab;