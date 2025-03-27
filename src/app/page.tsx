import { Grid, Col, CurrentlyArea } from "@/components";

export default function Home() {
  return (
    <Grid gap={4}>
      <Col cols={12}>
        <CurrentlyArea></CurrentlyArea>
      </Col>
    </Grid>
  );
}
