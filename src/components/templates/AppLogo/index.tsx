import { JSX } from "react";

import { Text } from "@/components";

const AppName = "お天気コーデ";

export const AppLogo = (): JSX.Element => {
  return (
    <Text
      as="h1"
      family="mono"
      weight="bold"
      spacing="wide"
      className="text-primary"
    >
      {AppName}
    </Text>
  );
};
