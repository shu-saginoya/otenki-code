import { ReactNode, ComponentProps, JSX } from "react";
import clsx from "clsx";

type ListProps = {
  children: ReactNode;
  divided?: boolean;
  className?: string;
} & ComponentProps<"ul">;

/**
 * List Component
 * @param children 子要素
 * @param divided 区切り線の表示（デフォルト: true）
 * @param className 追加のクラス名（任意）
 * @returns リスト要素を表示するコンポーネント
 */
export const List = ({
  children,
  divided = true,
  className,
  ...props
}: ListProps): JSX.Element => {
  return (
    <ul className={clsx([divided && "divide-y", className])} {...props}>
      {children}
    </ul>
  );
};

type ListItemProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<"li">;

/**
 * List Component
 * @param children 子要素
 * @param className 追加のクラス名（任意）
 * @returns リスト要素を表示するコンポーネント
 */
export const ListItem = ({
  children,
  className,
  ...props
}: ListItemProps): JSX.Element => {
  return (
    <li className={clsx(["p-2", className])} {...props}>
      {children}
    </li>
  );
};
