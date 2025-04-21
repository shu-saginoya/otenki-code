import tailwindConfig from "../../tailwind.config";

export type Color = keyof typeof tailwindConfig.theme.extend.colors;
