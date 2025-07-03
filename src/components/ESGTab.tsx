import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Meter,
  Stack,
  ResponsiveContext,
} from "grommet";
import {
  StatusGood,
  StatusWarning,
  StatusCritical,
  StatusInfo,
} from "grommet-icons";

// Define the structure for ESG metrics
interface EsgMetrics {
  environmental: {
    pue: number;
    renewableEnergyPercent: number;
    waterUsageLiters: number;
    carbonFootprintTCO2e: number;
  };
  social: {
    employeeSatisfactionPercent: number;
    communityEngagementHours: number;
    diversityPercent: number;
  };
  governance: {
    dataBreaches: number;
    complianceRatePercent: number;
    certifications: string[];
  };
}

// Enhanced mock data with realistic metrics and trends
const esgData: EsgMetrics = {
  environmental: {
    pue: 1.32, // Industry-leading PUE (Power Usage Effectiveness)
    renewableEnergyPercent: 87, // High renewable energy usage
    waterUsageLiters: 38500, // Water usage in liters
    carbonFootprintTCO2e: 985, // Carbon footprint in metric tons CO2e
  },
  social: {
    employeeSatisfactionPercent: 94, // High employee satisfaction
    communityEngagementHours: 620, // Annual community engagement
    diversityPercent: 52, // Workforce diversity percentage
  },
  governance: {
    dataBreaches: 0, // No data breaches this year
    complianceRatePercent: 98, // High compliance rate
    certifications: [
      "ISO 50001:2018", // Energy Management
      "ISO 14001:2015", // Environmental Management
      "ISO 27001:2022", // Information Security
      "SOC 2 Type II", // Service Organization Controls
      "LEED Platinum", // Building Certification
    ],
  },
};

// Additional metrics for enhanced visualization
const metrics = {
  pueBenchmark: 1.57, // Industry average PUE
  carbonReduction: 15, // % reduction from last year
  waterReduction: 22, // % reduction from last year
  renewableTrend: 8, // % increase from last year
  diversityTrend: 3, // % increase from last year
  complianceTrend: 2, // % increase from last year
  lastUpdated: "2025-07-02T09:15:00Z",
};

// Trend indicator component
const TrendIndicator: React.FC<{
  value: number;
  previous: number;
  unit?: string;
}> = ({ value, previous, unit = "" }) => {
  const difference = value - previous;
  const isPositive = difference >= 0;
  const percentage = previous
    ? Math.abs((difference / previous) * 100).toFixed(1)
    : "0.0";

  if (difference === 0) return null;

  const Icon = isPositive ? StatusGood : StatusCritical;
  const color = isPositive ? "status-ok" : "status-critical";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <Box direction="row" align="center" gap="xsmall" margin={{ left: "small" }}>
      <Icon color={color} size="small" />
      <Text size="xsmall" color={color}>
        {percentage}% {unit} {arrow}
      </Text>
    </Box>
  );
};

// Enhanced MetricCard with optional icon and trend indicators
const MetricCard: React.FC<{
  title: string;
  icon?: React.ReactNode;
  trend?: {
    current: number;
    previous: number;
    unit?: string;
  };
  children: React.ReactNode;
}> = ({ title, icon, trend, children }) => (
  <Card
    background="light-1"
    pad={{ horizontal: "medium", vertical: "medium" }}
    elevation="small"
    round="small"
    height="100%"
  >
    <CardHeader
      direction="row"
      align="center"
      gap="small"
      margin={{ bottom: "medium" }}
    >
      {icon}
      <Heading level={3} margin="none" size="small">
        {title}
      </Heading>
      {trend && (
        <TrendIndicator
          value={trend.current}
          previous={trend.previous}
          unit={trend.unit}
        />
      )}
    </CardHeader>
    <CardBody pad="none">
      <Box gap="medium">{children}</Box>
    </CardBody>
  </Card>
);

const ESGTab: React.FC = () => {
  const { environmental, social, governance } = esgData;

  return (
    <Box
      direction="row"
      justify="start"
      align="start"
      gap="medium"
      style={{
        pointerEvents: "auto",
        fontWeight: "400",
        gridTemplateRows: "auto",
        gridTemplate: "auto / repeat(auto-fit, minmax(min(384px, 100%), 1fr))",
      }}
    >
      {/* Environmental */}
      <MetricCard title="Environmental">
        <Box gap="medium">
          <Box>
            <Text weight="bold">Power Usage Effectiveness (PUE)</Text>
            <Text size="large">{environmental.pue.toFixed(2)}</Text>
          </Box>
          <Box>
            <Text weight="bold">Renewable Energy</Text>
            <Box direction="row">
              <Meter
                values={[
                  {
                    value: environmental.renewableEnergyPercent,
                    label: "Renewable",
                    color: "status-ok",
                  },
                ]}
                aria-label="Renewable Energy Meter"
                max={100}
              />
              <Text alignSelf="end">
                {environmental.renewableEnergyPercent}%
              </Text>
            </Box>
          </Box>
          <Box>
            <Text weight="bold">Water Usage (Liters)</Text>
            <Text size="large">
              {environmental.waterUsageLiters.toLocaleString()}
            </Text>
          </Box>
          <Box>
            <Text weight="bold">Carbon Footprint (tCO2e)</Text>
            <Text size="large">
              {environmental.carbonFootprintTCO2e.toLocaleString()}
            </Text>
          </Box>
        </Box>
      </MetricCard>

      {/* Social */}
      <MetricCard title="Social">
        <Box gap="medium">
          <Box>
            <Text weight="bold">Employee Satisfaction</Text>
            <Box direction="row">
              <Meter
                values={[
                  {
                    value: social.employeeSatisfactionPercent,
                    label: "Satisfaction",
                    color: "status-ok",
                  },
                ]}
                aria-label="Employee Satisfaction Meter"
                max={100}
              />
              <Text alignSelf="end">{social.employeeSatisfactionPercent}%</Text>
            </Box>
          </Box>
          <Box>
            <Text weight="bold">Community Engagement (Hours)</Text>
            <Text size="large">{social.communityEngagementHours}</Text>
          </Box>
          <Box>
            <Text weight="bold">Workforce Diversity</Text>
            <Box direction="row">
              <Meter
                values={[
                  {
                    value: social.diversityPercent,
                    label: "Diversity",
                    color: "graph-1",
                  },
                ]}
                aria-label="Workforce Diversity Meter"
                max={100}
              />
              <Text alignSelf="end">{social.diversityPercent}%</Text>
            </Box>
          </Box>
        </Box>
      </MetricCard>

      {/* Governance */}
      <MetricCard title="Governance">
        <Box gap="medium">
          <Box>
            <Text weight="bold">Data Breaches</Text>
            <Text
              size="large"
              color={
                governance.dataBreaches > 0 ? "status-critical" : "status-ok"
              }
            >
              {governance.dataBreaches}
            </Text>
          </Box>
          <Box>
            <Text weight="bold">Compliance Rate</Text>
            <Box direction="row">
              <Meter
                values={[
                  {
                    value: governance.complianceRatePercent,
                    label: "Compliance",
                    color: "status-ok",
                  },
                ]}
                aria-label="Compliance Rate Meter"
                max={100}
              />
              <Text alignSelf="end">{governance.complianceRatePercent}%</Text>
            </Box>
          </Box>
          <Box>
            <Text weight="bold">Certifications</Text>
            <Box direction="row" gap="small" wrap>
              {governance.certifications.map((cert) => (
                <Box
                  key={cert}
                  background="light-4"
                  pad={{ horizontal: "small", vertical: "xsmall" }}
                  round="small"
                  margin={"xxsmall"}
                >
                  <Text size="small">{cert}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </MetricCard>
    </Box>
  );
};

export default ESGTab;
