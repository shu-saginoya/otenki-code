import { JSX } from "react";

const AppName = "お天気コーデ";

const AppLogo = (): JSX.Element => {
  return <h1 className="font-mono font-bold tracking-wide">{AppName}</h1>;
};

export default AppLogo;
