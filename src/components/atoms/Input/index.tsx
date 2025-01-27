import { InputHTMLAttributes, FC } from "react";
import clsx from "clsx";

export type InputProps = {
  type: "email" | "tel" | "text" | "url"; // typeを必須に
  hasError?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">; // 既存のtypeを除外

/**
 * 基本的なテキスト入力コンポーネント
 * @param hasError - エラー状態を示すフラグ。trueの場合、赤い枠線で表示
 * @param props - 標準のinput要素の属性
 */
const Input: FC<InputProps> = ({ type, hasError = false, ...rest }) => {
  const baseStyles =
    "box-border w-full border rounded p-3 placeholder:text-disabled  text-foreground dark:text-background-light disabled:opacity-25 bg-background-light dark:bg-foreground-light";
  const variants = {
    default: "border-transparent",
    error: "border-error",
  };

  return (
    <input
      type={type}
      aria-invalid={hasError}
      className={clsx(baseStyles, variants[hasError ? "error" : "default"])}
      {...rest}
    />
  );
};

export default Input;
