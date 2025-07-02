import React from 'react';
import { Box, Card, CardBody, DataTable, Heading, Text, Tip } from 'grommet';

interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface SystemSecurity {
  system: string;
  available: SeverityCounts;
  fixed: SeverityCounts;
}

// Realistic datacenter security data
const securityData: SystemSecurity[] = [
  {
    system: 'Web Servers (NGINX)',
    available: { critical: 3, high: 7, medium: 12, low: 8 },
    fixed: { critical: 2, high: 5, medium: 15, low: 10 },
  },
  {
    system: 'Database (PostgreSQL)',
    available: { critical: 2, high: 4, medium: 8, low: 5 },
    fixed: { critical: 1, high: 6, medium: 12, low: 7 },
  },
  {
    system: 'Load Balancers (HAProxy)',
    available: { critical: 1, high: 3, medium: 5, low: 4 },
    fixed: { critical: 0, high: 2, medium: 6, low: 3 },
  },
  {
    system: 'Kubernetes Cluster',
    available: { critical: 5, high: 9, medium: 14, low: 7 },
    fixed: { critical: 3, high: 7, medium: 10, low: 5 },
  },
  {
    system: 'Monitoring Stack',
    available: { critical: 0, high: 2, medium: 6, low: 3 },
    fixed: { critical: 0, high: 1, medium: 4, low: 2 },
  },
  {
    system: 'CI/CD Pipeline',
    available: { critical: 1, high: 3, medium: 7, low: 4 },
    fixed: { critical: 0, high: 2, medium: 5, low: 3 },
  },
];

const sumSeverity = (data: SeverityCounts) =>
  data.critical + data.high + data.medium + data.low;

// Compute totals
const totalSystems = securityData.length;
const totals: SeverityCounts = securityData.reduce(
  (acc, cur) => {
    acc.critical += cur.available.critical;
    acc.high += cur.available.high;
    acc.medium += cur.available.medium;
    acc.low += cur.available.low;
    return acc;
  },
  { critical: 0, high: 0, medium: 0, low: 0 }
);

const SeverityCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => (
  <Card background="light-1" round="small" elevation="small" flex='grow' width={{  max: 'small' }}>
    <CardBody pad="small" justify="center">
      <Heading weight={600} color={ 'dark-2'} size='small' textAlign="center" >
        {label}
      </Heading>
    </CardBody>
    <CardBody pad="small" justify="center">
      <Text size="xxlarge" weight={700}  color={color || 'dark-2'}  textAlign="center">
        {value}
      </Text>
    </CardBody>
  </Card>
);

const renderSeverityTip = (counts: SeverityCounts) => (
  <Box pad="small" gap="xsmall">
    {(['critical', 'high', 'medium', 'low'] as const).map((level) => (
      <Text key={level}>{`${level.charAt(0).toUpperCase() + level.slice(1)}: ${counts[level]}`}</Text>
    ))}
  </Box>
);

const SecurityTab: React.FC = () => {
  return (
    <Box gap="medium">
      {/* Overview cards */}
      <Box direction="row" gap="medium" wrap justify="center" >
        <SeverityCard label="Total Systems" value={totalSystems} />
        <SeverityCard label="Critical" value={totals.critical} color="status-critical" />
        <SeverityCard label="High" value={totals.high} color="status-warning" />
        <SeverityCard label="Medium" value={totals.medium} color="orange" />
        <SeverityCard label="Low" value={totals.low} color="status-ok" />
      </Box>

      {/* Systems table */}
      <DataTable
        data={securityData.map((s) => ({
          system: s.system,
          available: sumSeverity(s.available),
          availableDetail: s.available,
          fixed: sumSeverity(s.fixed),
          fixedDetail: s.fixed,
        }))}
        columns={[
          { property: 'system', header: <Text weight={600}>System</Text>, primary: true },
          {
            property: 'available',
            header: <Text weight={600}>Available</Text>,
            render: (datum) => (
              <Tip content={renderSeverityTip(datum.availableDetail)}>
                <Text color="status-critical">{datum.available}</Text>
              </Tip>
            ),
          },
          {
            property: 'fixed',
            header: <Text weight={600}>Fixed</Text>,
            render: (datum) => (
              <Tip content={renderSeverityTip(datum.fixedDetail)}>
                <Text color="status-ok">{datum.fixed}</Text>
              </Tip>
            ),
          },
        ]}
      />
    </Box>
  );
};

export default SecurityTab;