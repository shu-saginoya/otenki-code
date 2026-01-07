import { InputHTMLAttributes, JSX } from "react";

import { cn } from "@/lib/cn";

export type InputProps = {
  type: "email" | "tel" | "text" | "url"; // typeを必須に
  hasError?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">; // 既存のtypeを除外

/**
 * 基本的なテキスト入力コンポーネント
 * @param hasError - エラー状態を示すフラグ。trueの場合、赤い枠線で表示
 * @param props - 標準のinput要素の属性
 */
export const Input = ({
  type,
  hasError = false,
  ...rest
}: InputProps): JSX.Element => {
  const baseStyles =
    "box-border w-full border rounded p-3 placeholder:text-disabled  text-foreground disabled:opacity-25 bg-background-light";
  const variants = {
    default: "border-transparent",
    error: "border-error",
  };

  return (
    <input
      type={type}
      aria-invalid={hasError}
      className={cn(baseStyles, variants[hasError ? "error" : "default"])}
      {...rest}
    />
  );
};
