"use client";

import { Grid, Col, Text, Card, List, ListItem, Button } from "@/components";
import { useSelectArea } from "@/hooks/useSelectArea";

export default function SelectArea() {
  const { options, loading, error, setNewArea, removeNewArea } =
    useSelectArea();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  if (options)
    return (
      <Grid>
        <Col cols={12} justify="center">
          <Text>いちばん近い地域を選択してください</Text>
        </Col>
        <Col cols={12}>
          <Card>
            <List>
              {Object.entries(options).map(([key, value]) => (
                <ListItem key={key}>
                  <Button
                    color="none"
                    appendIcon="arrowForward"
                    block
                    onClick={() => setNewArea({ name: value.name, code: key })}
                  >
                    {value.name}
                  </Button>
                </ListItem>
              ))}
              <ListItem>
                <Button
                  color="none"
                  appendIcon="arrowBackUp"
                  block
                  onClick={removeNewArea}
                >
                  もどる
                </Button>
              </ListItem>
            </List>
          </Card>
        </Col>
      </Grid>
    );
}
