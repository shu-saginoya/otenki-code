import { ReactNode, ComponentProps, FC } from "react";
import clsx from "clsx";

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
const ListItem: FC<ListItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={clsx(["p-2", className])} {...props}>
      {children}
    </li>
  );
};

export default ListItem;
