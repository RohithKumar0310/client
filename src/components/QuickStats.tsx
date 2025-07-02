import { Box, Card, CardBody, Heading, Text } from "grommet";
import { Ascending, Descending, FormSubtract } from "grommet-icons";

const stats = [
  {
    title: "Total Servers",
    value: "142",
    description: "Physical and virtual servers",
    change: "+4.3%",
    changeType: "increase",
  },
  {
    title: "Power Usage",
    value: "2.8 MW",
    description: "Current consumption",
    change: "-2.1%",
    changeType: "decrease",
  },
  {
    title: "PUE",
    value: "1.42",
    description: "Power Usage Effectiveness",
    change: "0%",
    changeType: "neutral",
  },
  {
    title: "Uptime",
    value: "99.98%",
    description: "Last 30 days",
    change: "+0.02%",
    changeType: "increase",
  },
];
const getTrendIcon = (changeType: string, change: string, title: string) => {
  const iconConfig = {
    increase: { Icon: Ascending, color: "#009a71" },
    decrease: { Icon: Descending, color: "#fc5a5a" },
    neutral: { Icon: FormSubtract, color: "#757575" },
  }[changeType];
  if (!iconConfig) return null;
  const { Icon, color } = iconConfig;
  return (
    <Box direction="row" align="center" flex="grow">
      <Text weight={600}>{title}</Text>
      <Box direction="row" align="center" flex="grow" />
      <Icon color={color} />
      <Text color={color}>{change}</Text>
    </Box>
  );
};

export const QuickStats = () => {
  return (
    <Box gap={"small"}>
      <Heading weight={600}>Quick Stats</Heading>
      <Box direction="row" gap="medium">
        {stats.map((stat, index) => (
          <Card key={index} background="background-back" flex="grow">
            <CardBody>
              <Box direction="column" gap={"xsmall"} justify="between">
                {getTrendIcon(stat.changeType, stat.change, stat.title)}
                <Text size="xlarge">{stat.value}</Text>
                <Text size="xsmall">{stat.description}</Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
