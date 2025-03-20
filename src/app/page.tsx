import { Grid, Col, Card, Text } from "@/components";

export default function Home() {
  return (
    <Grid gap={4}>
      <Col cols={12}>
        <Card className="max-w-lg">
          <Text>地域を選択してください</Text>
        </Card>
      </Col>
    </Grid>
  );
}
