import { Description, Field, Input, Label } from "@headlessui/react";
import { InputHTMLAttributes, JSX, useId } from "react";

import { cn } from "@/lib/cn";

export type InputProps = {
  type: "email" | "tel" | "text" | "url" | "password";
  label?: string;
  description?: string;
  errorMessage?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

/**
 * 基本的なテキスト入力コンポーネント
 *
 * @param type - 入力フィールドのタイプ
 * @param label - ラベル（オプション）
 * @param description - 説明文（オプション）
 * @param errorMessage - エラーメッセージ。存在する場合、赤い枠線とメッセージを表示
 * @param id - 入力フィールドのID（オプション。指定なしの場合は自動生成）
 * @param rest - HTML input要素の標準属性
 */
export const InputField = ({
  type,
  label,
  description,
  errorMessage,
  id,
  ...rest
}: InputProps): JSX.Element => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const baseStyles =
    "box-border w-full border rounded p-3 placeholder:text-disabled disabled:opacity-25";
  const variants = {
    default: "border-transparent",
    error: "border-error",
  };

  return (
    <Field>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {description && <Description>{description}</Description>}
      <Input
        id={inputId}
        type={type}
        aria-invalid={hasError}
        {...(hasError && { "aria-describedby": errorId })}
        className={cn(baseStyles, variants[hasError ? "error" : "default"])}
        {...rest}
      />
      {hasError && (
        <p id={errorId} aria-live="polite" className="text-error">
          {errorMessage}
        </p>
      )}
    </Field>
  );
};
