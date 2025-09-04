import { JSX } from "react";

import { Grid, Col, Stack, Text } from "@/components/ui";
import { useClothing } from "@/hooks/features";

type AppropriateClothingProps = {
  maxTemp: number;
  minTemp: number;
};

export const AppropriateClothing = ({
  maxTemp,
  minTemp,
}: AppropriateClothingProps): JSX.Element => {
  const { isLoading, getAppropriate } = useClothing();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const { tops, bottoms, outer } = getAppropriate(maxTemp, minTemp);

  return (
    <Grid>
      <Col cols={4}>
        {tops ? (
          <Stack direction="col">
            {/* <ShapeImage src={tops.imageUrl} alt={tops.name} /> */}
            <Text>{tops.name}</Text>
          </Stack>
        ) : (
          <Text>トップスが設定されていません</Text>
        )}
        {bottoms ? (
          <Stack direction="col">
            {/* <ShapeImage src={bottoms.imageUrl} alt={bottoms.name} /> */}
            <Text>{bottoms.name}</Text>
          </Stack>
        ) : (
          <Text>ボトムスが設定されていません</Text>
        )}
        {outer ? (
          <Stack direction="col">
            {/* <ShapeImage src={outer.imageUrl} alt={outer.name} /> */}
            <Text>{outer.name}</Text>
          </Stack>
        ) : (
          <Text>アウターが設定されていません</Text>
        )}
      </Col>
    </Grid>
  );
};
