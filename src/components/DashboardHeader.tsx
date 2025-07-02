import { Box, Header, Text, Button } from "grommet";
import { Update } from "grommet-icons";

export const DashboardHeader = () => {
  return (
    <Header border={"bottom"} >
      <Box
        direction="row"
        width={'100vw'}
        justify="between"
        pad={{ horizontal: "medium", vertical: "small" }}
      >
        <Box direction="column" justify="start" align="start">
          <Text weight={600} size="large">
            Datacenter Operations Dashboard
          </Text>
          <Text size="xsmall">
            Real-time monitoring and analytics
          </Text>
        </Box>
        <Box direction="row" align="center">

          <Text size="xsmall"  >Last updated : 12:34 PM</Text>

          <Button label='Refresh' icon={<Update />} />
        </Box>
      </Box>
    </Header>
  );
};
