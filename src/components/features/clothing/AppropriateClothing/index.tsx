import { JSX } from "react";

// import { Grid, Col, Stack, Text } from "@/components/ui";
// import { useClothing } from "@/hooks/features";

type AppropriateClothingProps = {
  maxTemp: number;
  minTemp: number;
};

export const AppropriateClothing = ({
  maxTemp,
  minTemp,
}: AppropriateClothingProps): JSX.Element => {
  return (
    <div>
      <p>このコンポーネントは準備中です</p>
      <p>
        {maxTemp}/{minTemp}
      </p>
    </div>
  );
  // const { isLoading, getAppropriate } = useClothing();
  /*   if (isLoading) {
    return <Text>Loading...</Text>;
  } */
  // const { tops, bottoms, outer } = getAppropriate(maxTemp, minTemp);
  /*   return (
    <Grid>
      <Col cols={4}>
        {tops ? (
          <Stack direction="col">
            <Text>{tops.name}</Text>
          </Stack>
        ) : (
          <Text>トップスが設定されていません</Text>
        )}
        {bottoms ? (
          <Stack direction="col">
            <Text>{bottoms.name}</Text>
          </Stack>
        ) : (
          <Text>ボトムスが設定されていません</Text>
        )}
        {outer ? (
          <Stack direction="col">
            <Text>{outer.name}</Text>
          </Stack>
        ) : (
          <Text>アウターが設定されていません</Text>
        )}
      </Col>
    </Grid>
  ); */
};
