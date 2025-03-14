import { Container, Col } from "@/components/layout/Container";
import Card from "@/components/atoms/Card";
import Text from "@/components/atoms/Text";

export default function Home() {
  return (
    <Container gap={4}>
      <Col cols={12}>
        <Card className="max-w-lg">
          <Text>地域を選択してください</Text>
        </Card>
      </Col>
    </Container>
  );
}
