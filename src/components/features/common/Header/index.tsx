"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { JSX, createElement } from "react";

import { AppLogo } from "@/components/features";
import { Grid, Col, IconButton, ShapeImage, Stack } from "@/components/ui";
import { useAuth, useUser } from "@/hooks/features";
import { useAppRouter } from "@/hooks/features/useAppRouter";
import { cn } from "@/lib/cn";
import { iconMap } from "@/lib/reactIcons";
import { colorVariantMap, fontSizeMap, roundedMap, paddingMap } from "@/styles";

export type HeaderProps = {
  className: string;
};

const showAlert = (): void => alert("準備中");

/**
 * ヘッダー
 */
export const Header = ({ className }: HeaderProps): JSX.Element => {
  const { user, loading } = useUser();
  const { handleLogout } = useAuth();
  const { navigateTo } = useAppRouter();

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  return (
    <header className={cn(className, "px-4 py-2")}>
      <Grid align="center">
        <Col cols={6}>
          <AppLogo></AppLogo>
        </Col>
        <Col cols={6} justify="end">
          <Stack gap={2}>
            <IconButton
              icon="bell"
              color="background"
              onClick={showAlert}
            ></IconButton>
            {!loading &&
              (user ? (
                <Menu as="div" className="relative">
                  <MenuButton
                    className={cn(
                      "cursor-pointer focus:outline-none",
                      colorVariantMap["paint"]("background", {
                        actionable: true,
                      }),
                      fontSizeMap["xl"],
                      roundedMap["full"],
                      paddingMap[1]
                    )}
                  >
                    {avatarUrl ? (
                      <ShapeImage
                        src={avatarUrl}
                        alt="ユーザーアイコン"
                        width={28}
                        height={28}
                        shape="circle"
                      />
                    ) : (
                      createElement(iconMap.person)
                    )}
                  </MenuButton>
                  <MenuItems
                    anchor="bottom end"
                    className="z-50 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  >
                    <MenuItem>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        onClick={showAlert}
                      >
                        {createElement(iconMap.settings)}
                        ユーザー設定
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                        onClick={handleLogout}
                      >
                        {createElement(iconMap.logout)}
                        ログアウト
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <IconButton
                  icon="login"
                  color="background"
                  onClick={() => navigateTo("login")}
                />
              ))}
          </Stack>
        </Col>
      </Grid>
    </header>
  );
};
