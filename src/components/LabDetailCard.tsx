import { Card, CardBody, CardHeader, Text } from 'grommet'
const LabDetailCard = ({ title, icon, fields }) => {
    return (
        <Card background="background-front" pad="small" gap="small" round="xsmall" flex='grow' elevation="small">
            <CardHeader pad={'none'} justify="center" gap={'xsmall'}>
                <Text weight={600} size="xlarge" color="dark-1">{title}</Text>
                {icon} 
            </CardHeader>
            <CardBody pad={'xsmall'} align="center" direction="column">
                {fields.map((field: string) => (
                    <Text key={field} size="medium" weight={600}>
                        {field}
                    </Text>
                ))}
            </CardBody>
        </Card>
    )
}
export default LabDetailCard