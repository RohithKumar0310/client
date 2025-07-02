import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Box, CardBody, Card, Text, CardHeader, Heading } from "grommet";
import {ShieldSecurity,Power,FanOption,PowerCycle} from 'grommet-icons'

const powerData = [
  { time: "00:00", usage: 2400, renewable: 1608 },
  { time: "04:00", usage: 2200, renewable: 1474 },
  { time: "08:00", usage: 2800, renewable: 1876 },
  { time: "12:00", usage: 3200, renewable: 2144 },
  { time: "16:00", usage: 3100, renewable: 2077 },
  { time: "20:00", usage: 2900, renewable: 1943 },
];

const pueData = [
  { month: "Jan", pue: 1.45 },
  { month: "Feb", pue: 1.43 },
  { month: "Mar", pue: 1.41 },
  { month: "Apr", pue: 1.42 },
  { month: "May", pue: 1.4 },
  { month: "Jun", pue: 1.42 },
];

const wasteData = [
  { name: "Recycled", value: 78, color: "#01a982" },
  { name: "Disposed", value: 22, color: "#fc6161" },
];

export const ESGMetrics = () => {
  return (
    <Box gap="medium">
      <Box direction="row" justify="between" align="center">
        <Heading  weight={600}>
          ESG Metrics
        </Heading>
        <Box   border pad={"xsmall"}>
          <Text size="xsmall" >
            Environmental, Social, Governance
          </Text>
        </Box>
      </Box>

      {/* Power and Energy */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <Power />
            <Text weight={600}>Power & Energy Usage</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" gap="xlarge" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Total Power Consumption</Text>
              <Text size="large">3.2 MW</Text>
            </Box>
            <Box>
              <Text size="xsmall">Renewable Energy</Text>
              <Text size="large" color="status-ok">
                67%
              </Text>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={powerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#7630EA"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="renewable"
                stroke="#01a982"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* PUE Tracking */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <PowerCycle />
            <Text weight={600}>Power Usage Effectiveness (PUE)</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" gap="xlarge" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Current PUE</Text>
              <Text size="large">1.42</Text>
              <Text size="xsmall" color="text-weak">
                Target: 1.3 or lower
              </Text>
              
            </Box>
            <Box>
              <Text size="xsmall">Improvement</Text>
              <Text size="large" color="status-ok">
                8%
              </Text>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={pueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis domain={[1.3, 1.5]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pue"
                stroke="#ffbc44"
                fill="#ffbc44"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Cooling and Water */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <FanOption />
            <Text weight={600}>Cooling & Water Usage</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" gap="xlarge" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Water Usage</Text>
              <Text size="large">42,000L</Text>
              <Text size="xsmall" color="status-critical">
                -8% vs last month
              </Text>
            </Box>
            <Box>
              <Text size="xsmall">Cooling Efficiency</Text>
              <Text size="large">85%</Text>
              <Box width="medium" pad={{ top: "xsmall" }}>
                <Box
                  background="light-4"
                  height="6px"
                  round="xsmall"
                  overflow="hidden"
                  width="100%"
                >
                  <Box
                    background="#00c8ff"
                    height="100%"
                    width="85%"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>

      {/* E-Waste Reduction */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <ShieldSecurity />
            <Text weight={600}>Electronic Waste Management</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" align="center" justify="between" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Waste Recycled</Text>
              <Text size="xlarge" color="status-ok">78%</Text>
            </Box>
            <Box width="96px" height="96px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={48}
                    paddingAngle={2}
                  >
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box gap="small">
            <Box direction="row" justify="between">
              <Text size="small" color="text-weak">Equipment Recycled</Text>
              <Text size="small">245 units</Text>
            </Box>
            <Box direction="row" justify="between">
              <Text size="small" color="text-weak">Material Recovery</Text>
              <Text size="small">1.2 tons</Text>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};
