import React, { useState } from 'react';
import { Box, Select, DataTable, Text, Heading, Button } from 'grommet';
import * as XLSX from 'xlsx';
import { Download } from 'grommet-icons';

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
  'LR-4': [
    { subnet: '10.40.1.0/24', ipCount: 180 },
    { subnet: '10.40.2.0/24', ipCount: 150 },
    { subnet: '10.40.3.0/24', ipCount: 195 },
  ]
};

const compartments = Object.keys(networkData) as Array<keyof typeof networkData>;

const NetworkTab: React.FC = () => {
  const [selectedCompartment, setSelectedCompartment] = useState<NetworkCompartment>('LR-1');

  const subnets = networkData[selectedCompartment];

  const exportToExcel = () => {
    // Create a worksheet from the subnets data
    const ws = XLSX.utils.json_to_sheet(subnets);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Network_${selectedCompartment}`);

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, `network_${selectedCompartment.toLowerCase()}_subnets.xlsx`);
  };

  return (
    <Box gap="small">
      {/* Compartment selector */}
      <Box direction='row' justify='between' align='center'>
        <Box direction='row' gap='small' align='center'>
          <Heading level={2}>Compartment : </Heading>
          <Select 
            options={compartments} 
            value={selectedCompartment} 
            onChange={({ option }) => setSelectedCompartment(option)} 
          />
        </Box>
        <Button
          primary
          icon={<Download />}
          label="Export"
          onClick={exportToExcel}
          gap="small"
          size="small"
        />
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