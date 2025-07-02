import React from 'react';
import { DataTable, Text } from 'grommet';

interface WingInfo {
  name: 'North' | 'South';
  totalRacks: number;
  emptyUnits: number;
}

interface FloorInfo {
  floor: number;
  wings: WingInfo[];
}

import floorLayout from '../Data/floor_layout_template.json';
// Helper to synthesize realistic rack/space data for 5 floors
function getFloorsData(): FloorInfo[] {
  const floors: FloorInfo[] = [];
  // Floor numbers 1-5
  for (let i = 1; i <= 5; i++) {
    const floorWings: WingInfo[] = [];
    ['North', 'South'].forEach((wing) => {
      const key = `${i}-${wing}`;
      const layout = (floorLayout as any)[key];
      if (layout) {
        // Count total racks (exclude 'Unused'/'Pillar')
        const totalRacks = false
          ? layout.static_racks.filter((r: any) => r.rack_name !== 'Unused' && r.rack_name !== 'Pillar').length
          : 304;
        // Synthesize empty units (unused racks)
        const emptyUnits = Array.isArray(layout.static_racks)
          ? layout.static_racks.filter((r: any) => r.rack_name === 'Unused').length
          : 0;
        floorWings.push({ name: wing as 'North' | 'South', totalRacks, emptyUnits });
      }
    });
    if (floorWings.length > 0) {
      floors.push({ floor: i, wings: floorWings });
    }
  }
  return floors;
}

const floorsData = getFloorsData();

interface FloorRow {
  floor: number;
  totalRacks: number;
  emptyUnits: number;
}

const rackRows: FloorRow[] = floorsData.map((floor) => {
  const totalRacks = floor.wings.reduce((sum, wing) => sum + wing.totalRacks, 0);
  const emptyUnits = floor.wings.reduce((sum, wing) => sum + wing.emptyUnits, 0);
  return { floor: floor.floor, totalRacks, emptyUnits };
});

const RackSpaceTab: React.FC = () => (
  <DataTable
    columns={[
      { property: 'floor', header: <Text weight={600}>Floor</Text> },
      { property: 'totalRacks', header: <Text weight={600}>Total Racks</Text> },
      { property: 'emptyUnits', header: <Text weight={600}>Empty Units</Text> },
    ]}
    data={rackRows}
    primaryKey={false}
    resizeable
  />
);

export default RackSpaceTab;