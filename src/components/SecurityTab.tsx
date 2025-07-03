import React from 'react';
import { Box, Card, CardBody, DataTable, Heading, Text, Tip, Button } from 'grommet';
import * as XLSX from 'xlsx';
import { Download } from 'grommet-icons';

interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface SystemSecurity {
  system: string;
  Vulnerabilities: SeverityCounts;
  fixed: SeverityCounts;
}

// Realistic datacenter security data
const securityData: SystemSecurity[] = [
  {
    system: 'Web Servers (NGINX)',
    Vulnerabilities: { critical: 3, high: 7, medium: 12, low: 8 },
    fixed: { critical: 2, high: 5, medium: 10, low: 6 },
  },
  {
    system: 'Database Servers (PostgreSQL)',
    Vulnerabilities: { critical: 2, high: 4, medium: 8, low: 5 },
    fixed: { critical: 1, high: 3, medium: 7, low: 4 },
  },
  {
    system: 'Application Servers (Node.js)',
    Vulnerabilities: { critical: 1, high: 3, medium: 5, low: 4 },
    fixed: { critical: 0, high: 2, medium: 4, low: 3 },
  },
  {
    system: 'Virtualization (VMware)',
    Vulnerabilities: { critical: 5, high: 9, medium: 14, low: 7 },
    fixed: { critical: 3, high: 7, medium: 10, low: 5 },
  },
  {
    system: 'Storage (NetApp)',
    Vulnerabilities: { critical: 0, high: 2, medium: 6, low: 3 },
    fixed: { critical: 0, high: 1, medium: 4, low: 2 },
  },
  {
    system: 'Network (Cisco)',
    Vulnerabilities: { critical: 1, high: 3, medium: 7, low: 4 },
    fixed: { critical: 0, high: 2, medium: 5, low: 3 },
  },
];

const sumSeverity = (data: SeverityCounts) =>
  data.critical + data.high + data.medium + data.low;

// Compute totals
const totalSystems = securityData.length;
const totals: SeverityCounts = securityData.reduce(
  (acc, cur) => {
    acc.critical += cur.Vulnerabilities.critical;
    acc.high += cur.Vulnerabilities.high;
    acc.medium += cur.Vulnerabilities.medium;
    acc.low += cur.Vulnerabilities.low;
    return acc;
  },
  { critical: 0, high: 0, medium: 0, low: 0 }
);

const SeverityCard: React.FC<{ label: string; value: number; color?: string }> = ({ label, value, color }) => (
  <Card background="light-1" round="small" elevation="small" flex='grow' width={{ max: 'small' }}>
    <CardBody pad="small" justify="center">
      <Heading weight={600} color={'dark-2'} size='small' textAlign="center" >
        {label}
      </Heading>
    </CardBody>
    <CardBody pad="small" justify="center">
      <Text size="xxlarge" weight={700} color={color || 'dark-2'} textAlign="center">
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

// Interface for the flattened security data for export
interface SecurityExportData {
  system: string;
  vulnerabilities_critical: number;
  vulnerabilities_high: number;
  vulnerabilities_medium: number;
  vulnerabilities_low: number;
  fixed_critical: number;
  fixed_high: number;
  fixed_medium: number;
  fixed_low: number;
}

// Interface for the flattened security data for export
interface SecurityExportData {
  system: string;
  vulnerabilities_critical: number;
  vulnerabilities_high: number;
  vulnerabilities_medium: number;
  vulnerabilities_low: number;
  fixed_critical: number;
  fixed_high: number;
  fixed_medium: number;
  fixed_low: number;
}

const SecurityTab: React.FC = () => {
  // Prepare data for export
  const exportToExcel = () => {
    // Flatten the security data for export
    const exportData: SecurityExportData[] = securityData.map(system => ({
      system: system.system,
      vulnerabilities_critical: system.Vulnerabilities.critical,
      vulnerabilities_high: system.Vulnerabilities.high,
      vulnerabilities_medium: system.Vulnerabilities.medium,
      vulnerabilities_low: system.Vulnerabilities.low,
      fixed_critical: system.fixed.critical,
      fixed_high: system.fixed.high,
      fixed_medium: system.fixed.medium,
      fixed_low: system.fixed.low,
    }));

    // Add a row for totals
    exportData.push({
      system: 'TOTAL',
      vulnerabilities_critical: totals.critical,
      vulnerabilities_high: totals.high,
      vulnerabilities_medium: totals.medium,
      vulnerabilities_low: totals.low,
      fixed_critical: securityData.reduce((sum, s) => sum + s.fixed.critical, 0),
      fixed_high: securityData.reduce((sum, s) => sum + s.fixed.high, 0),
      fixed_medium: securityData.reduce((sum, s) => sum + s.fixed.medium, 0),
      fixed_low: securityData.reduce((sum, s) => sum + s.fixed.low, 0),
    });

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Security_Report');

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, 'security_report.xlsx');
  };

  return (
    <Box gap="small">
      <Box direction='row' justify='between' align='center'>
        <Text weight={600}>Recent Patch Activity</Text>
        <Button
          primary
          icon={<Download />}
          label="Export"
          onClick={exportToExcel}
          gap="small"
          size="small"
        />
      </Box>
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
          Vulnerabilities: sumSeverity(s.Vulnerabilities),
          VulnerabilitiesDetail: s.Vulnerabilities,
          fixed: sumSeverity(s.fixed),
          fixedDetail: s.fixed,
        }))}
        columns={[
          { property: 'system', header: <Text weight={600}>System</Text>, primary: true },
          {
            property: 'Vulnerabilities',
            header: <Text weight={600}>Vulnerabilities</Text>,
            render: (datum) => (
              <Tip content={renderSeverityTip(datum.VulnerabilitiesDetail)}>
                <Text color="status-critical">{datum.Vulnerabilities}</Text>
              </Tip>
            ),
          },
          {
            property: 'fixed',
            header: <Text weight={600}>Remediated Using SecOPS</Text>,
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