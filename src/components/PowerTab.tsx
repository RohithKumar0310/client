import React from 'react';
import { DataTable, Text } from 'grommet';

interface OwnerInfo {
  rack: string;
  owner: string;
  powerKw: number;
}

interface WingPowerInfo {
  name: 'North' | 'South';
  totalPowerKw: number;
  owners: OwnerInfo[];
}

interface FloorPowerInfo {
  floor: number;
  wings: WingPowerInfo[];
}

// Realistic datacenter power distribution data
const powerFloorsData: FloorPowerInfo[] = [
  {
    floor: 1,
    wings: [
      {
        name: 'North',
        totalPowerKw: 1250,
        owners: [
          { rack: 'R1-R10', owner: 'Shivanna, Latha', powerKw: 320 },
          { rack: 'R11-R15', owner: 'Viswanathan, Balasubramanian', powerKw: 280 },
          { rack: 'R16-R20', owner: 'Gaur, Parag', powerKw: 240 },
          { rack: 'R21-R25', owner: 'Hung, Rex', powerKw: 210 },
          { rack: 'R26-R30', owner: 'S, Jagadish', powerKw: 200 }
        ]
      },
      {
        name: 'South',
        totalPowerKw: 1180,
        owners: [
          { rack: 'R31-R35', owner: 'Prasad, Rohit', powerKw: 310 },
          { rack: 'R36-R40', owner: 'Kulkarni, Ravi S', powerKw: 270 },
          { rack: 'R41-R45', owner: 'Dasgupta, Tania', powerKw: 250 },
          { rack: 'R46-R50', owner: 'Nidagundi, Eshwar V', powerKw: 220 },
          { rack: 'R51-R55', owner: 'Shetty, Prashant R', powerKw: 190 }
        ]
      }
    ]
  },
  {
    floor: 2,
    wings: [
      {
        name: 'North',
        totalPowerKw: 1320,
        owners: [
          { rack: 'R101-R105', owner: 'M R, Jithesh', powerKw: 340 },
          { rack: 'R106-R110', owner: 'R, Navitha', powerKw: 290 },
          { rack: 'R111-R115', owner: 'Shenoy, Deepak', powerKw: 260 },
          { rack: 'R116-R120', owner: 'Neogi, Arup Guha', powerKw: 230 },
          { rack: 'R121-R125', owner: 'Shrivastava, Manish', powerKw: 200 }
        ]
      },
      {
        name: 'South',
        totalPowerKw: 1260,
        owners: [
          { rack: 'R126-R130', owner: 'Kola, Niranjan Kumar', powerKw: 330 },
          { rack: 'R131-R135', owner: 'Alvin Chen', powerKw: 280 },
          { rack: 'R136-R140', owner: 'Callegari, Eugene', powerKw: 250 },
          { rack: 'R141-R145', owner: 'Sundaramoorthy, Vijaianand', powerKw: 220 },
          { rack: 'R146-R150', owner: 'Simha, Ajeya', powerKw: 180 }
        ]
      }
    ]
  },
  {
    floor: 3,
    wings: [
      {
        name: 'North',
        totalPowerKw: 1400,
        owners: [
          { rack: 'R201-R205', owner: 'Infrastructure Team', powerKw: 360 },
          { rack: 'R206-R210', owner: 'Cloud Services', powerKw: 300 },
          { rack: 'R211-R215', owner: 'Data Analytics', powerKw: 280 },
          { rack: 'R216-R220', owner: 'DevOps', powerKw: 240 },
          { rack: 'R221-R225', owner: 'QA', powerKw: 220 }
        ]
      },
      {
        name: 'South',
        totalPowerKw: 1350,
        owners: [
          { rack: 'R226-R230', owner: 'Database Team', powerKw: 350 },
          { rack: 'R231-R235', owner: 'Network Team', powerKw: 310 },
          { rack: 'R236-R240', owner: 'Security Team', powerKw: 290 },
          { rack: 'R241-R245', owner: 'Storage Team', powerKw: 250 },
          { rack: 'R246-R250', owner: 'Backup Team', powerKw: 210 }
        ]
      }
    ]
  },
  {
    floor: 4,
    wings: [
      {
        name: 'North',
        totalPowerKw: 1280,
        owners: [
          { rack: 'R301-R305', owner: 'AI/ML Team', powerKw: 340 },
          { rack: 'R306-R310', owner: 'Big Data', powerKw: 290 },
          { rack: 'R311-R315', owner: 'IoT Platform', powerKw: 270 },
          { rack: 'R316-R320', owner: 'Edge Computing', powerKw: 220 },
          { rack: 'R321-R325', owner: 'Blockchain', powerKw: 200 }
        ]
      },
      {
        name: 'South',
        totalPowerKw: 1220,
        owners: [
          { rack: 'R326-R330', owner: 'VR/AR Team', powerKw: 320 },
          { rack: 'R331-R335', owner: 'Gaming', powerKw: 280 },
          { rack: 'R336-R340', owner: 'Media Processing', powerKw: 240 },
          { rack: 'R341-R345', owner: 'Rendering Farm', powerKw: 210 },
          { rack: 'R346-R350', owner: 'Simulation', powerKw: 190 }
        ]
      }
    ]
  },
  {
    floor: 5,
    wings: [
      {
        name: 'North',
        totalPowerKw: 1380,
        owners: [
          { rack: 'R401-R405', owner: 'Research Team A', powerKw: 350 },
          { rack: 'R406-R410', owner: 'Research Team B', powerKw: 320 },
          { rack: 'R411-R415', owner: 'Research Team C', powerKw: 290 },
          { rack: 'R416-R420', owner: 'Research Team D', powerKw: 250 },
          { rack: 'R421-R425', owner: 'Research Team E', powerKw: 220 }
        ]
      },
      {
        name: 'South',
        totalPowerKw: 1300,
        owners: [
          { rack: 'R426-R430', owner: 'Lab 1', powerKw: 330 },
          { rack: 'R431-R435', owner: 'Lab 2', powerKw: 300 },
          { rack: 'R436-R440', owner: 'Lab 3', powerKw: 280 },
          { rack: 'R441-R445', owner: 'Lab 4', powerKw: 240 },
          { rack: 'R446-R450', owner: 'Lab 5', powerKw: 210 }
        ]
      }
    ]
  }
];

interface FloorRow {
  floor: number;
  totalPowerKw: number;
  owners: string;
}

const powerRows: FloorRow[] = powerFloorsData.map((floor) => {
  const totalPowerKw = floor.wings.reduce((sum, wing) => sum + wing.totalPowerKw, 0);
  const allOwners = floor.wings.flatMap((wing) => wing.owners);
  const owners = allOwners
    .sort((a, b) => b.powerKw - a.powerKw)
    .slice(0, 5)
    .map((o) => `${o.owner} (${o.rack})`)
    .join(', ');
  return { floor: floor.floor, totalPowerKw, owners };
});

const PowerTab: React.FC = () => (
  <DataTable
    columns={[
      { property: 'floor', header: <Text weight={600}>Floor</Text> },
      { property: 'totalPowerKw', header: <Text weight={600}>Total kW</Text> },
      { property: 'owners', header: <Text weight={600}>Top Owners</Text> },
    ]}
    data={powerRows}
    primaryKey={false}
    resizeable
  />
);

export default PowerTab;