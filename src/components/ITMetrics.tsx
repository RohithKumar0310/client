import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Box, Card, CardHeader, CardBody, Text, Heading } from "grommet";
import { Storage, Cpu, Grow, Compliance, CircleInformation } from "grommet-icons";
import { useNavigate } from "react-router-dom";

const networkData = [
  { time: "00:00", bandwidth: 85, latency: 12, uptime: 99.98 },
  { time: "04:00", bandwidth: 72, latency: 8, uptime: 99.99 },
  { time: "08:00", bandwidth: 93, latency: 15, uptime: 99.97 },
  { time: "12:00", bandwidth: 98, latency: 18, uptime: 99.96 },
  { time: "16:00", bandwidth: 94, latency: 14, uptime: 99.98 },
  { time: "20:00", bandwidth: 88, latency: 11, uptime: 99.99 },
];

const utilizationData = [
  { category: "Compute", current: 84, capacity: 100 },
  { category: "HPC & AI", current: 72, capacity: 100 },
  { category: "Hybrid Cloud", current: 58, capacity: 100 },
  { category: "Intelligent Edge", current: 76, capacity: 100 },
  { category: "IWF Site", current: 68, capacity: 100 },
];

const complianceItems = [
  { name: "SOC 2 Type II", status: "compliant", lastAudit: "2024-01-15" },
  { name: "ISO 27001", status: "compliant", lastAudit: "2024-02-28" },
  { name: "PCI DSS", status: "pending", lastAudit: "2023-12-10" },
  { name: "GDPR", status: "compliant", lastAudit: "2024-03-05" },
];

export const ITMetrics = () => {
  const navigate = useNavigate();

  return (
    <Box gap="medium">
      <Box direction="row" justify="between" align="center">
        <Heading weight={600}>
          IT Metrics
        </Heading>
        <Box border pad={"xsmall"}>
          <Text size="xsmall">Infrastructure & Operations</Text>
        </Box>
      </Box>

      {/* Network Performance */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <Storage />
            <Text weight={600}>Network Performance</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" gap="xlarge" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Bandwidth Usage</Text>
              <Text size="large">94%</Text>
            </Box>
            <Box>
              <Text size="xsmall">Avg Latency</Text>
              <Text size="large">14ms</Text>
            </Box>
            <Box>
              <Text size="xsmall">Uptime</Text>
              <Text size="large" color="status-ok">
                99.98%
              </Text>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="bandwidth"
                stroke="#01a982"
                fill="#01a982"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Resource Utilization & Capacity */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <Cpu />
            <Text weight={600}>Resource Utilization & Capacity</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box gap="medium">
            {utilizationData.map((item, index) => (
              <Box
                key={index}
                onClick={() => navigate(`/BU/${encodeURIComponent(item.category)}`)}
                style={{ cursor: "pointer" }}
              >
                <Box direction="row" justify="between" align="center" pad={{ bottom: "xxsmall" }}>
                  <Text size="small" weight={500}>
                    {item.category}
                  </Text>
                  <Text size="small" color="text-weak">
                    {item.current}%
                  </Text>
                </Box>
                <Box background="light-4" height="6px" round="xsmall" overflow="hidden">
                  <Box
                    background="#7630EA"
                    height="100%"
                    width={`${item.current}%`}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </CardBody>
      </Card>

      {/* Effectiveness Metrics */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <Grow />
            <Text weight={600}>Effectiveness Metrics</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box direction="row" gap="xlarge" pad={{ bottom: "medium" }}>
            <Box>
              <Text size="xsmall">Carbon Usage Effectiveness (CUE)</Text>
              <Text size="large">0.28</Text>
              <Text size="xsmall" color="status-ok">
                Excellent rating
              </Text>
            </Box>
            <Box>
              <Text size="xsmall">DCiE</Text>
              <Text size="large">70.4%</Text>
              <Text size="xsmall" color="status-ok">
                Above industry avg
              </Text>
            </Box>
          </Box>
          <Box>
            <Text size="xsmall" color="text-weak">
              Throughput (GB/s)
            </Text>
            <Box direction="row" align="center" gap="small">
              <Box>
                <Text size="xlarge">24.7</Text>
                <Text size="xsmall" color="status-ok">+12% vs target</Text></Box>
            </Box>
          </Box>
        </CardBody>
      </Card>


      {/* Compliance & SLA */}
      <Card border>
        <CardHeader>
          <Box direction="row" align="center" gap="small">
            <Compliance />
            <Text weight={600}>Compliance & SLA Status</Text>
          </Box>
        </CardHeader>
        <CardBody style={{ paddingTop: "0px" }}>
          <Box gap="small">
            {complianceItems.map((item, index) => (
              <Box
                key={index}
                direction="row"
                justify="between"
                pad="small"
                border={{ color: "light-4" }}
                round="xsmall"
              >
                <Box>
                  <Text weight={500}>{item.name}</Text>
                  <Text size="xsmall" color="text-weak">
                    Last audit: {item.lastAudit}
                  </Text>
                </Box>

                < Text
                  style={{
                    color:
                      item.status === "compliant"
                        ? "#ec3331"
                        : item.status === "pending"
                          ? "#d36d00"
                          : "#757575",

                  }}
                >
                  {item.status[0].toUpperCase()}{item.status.slice(1,)}
                </Text>

              </Box>
            ))}
          </Box>
          <Box margin={{ top: "medium" }} pad="small" background="light-1" round="xsmall">
            <Box direction="row" align="center" gap="xsmall">
              <CircleInformation
                size="small" color="blue" />
              <Text weight={500} size="small">SLA Performance</Text>
            </Box>
            <Text size="xsmall" color="text-weak" margin={{ top: "xxsmall" }}>
              99.9% uptime maintained (Target: 99.5%)
            </Text>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};
