import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: (() => {
    let compilerConfig = {};
    if (process.env.NODE_ENV === "production") {
      compilerConfig = {
        ...compilerConfig,
        // 本番環境ではReact Testing Libraryで使用するdate-testid属性を削除
        reactRemoveProperties: { properties: ["^date-testid$"] },
      };
    }

    return compilerConfig;
  })(),
};

export default nextConfig;
