import { JSX } from "react";
import Text from "@/components/atoms/Text";

const AppName = "お天気コーデ";

const AppLogo = (): JSX.Element => {
  return (
    <Text as="h1" family="mono" weight="bold" spacing="wide">
      {AppName}
    </Text>
  );
};

export default AppLogo;
