/**
 * @file 色についての型定義
 */

import tailwindConfig from "../../tailwind.config";

export type Color = keyof typeof tailwindConfig.theme.extend.colors;
