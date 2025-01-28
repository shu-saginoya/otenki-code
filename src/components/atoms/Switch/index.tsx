import { Switch as HUSwitch } from "@headlessui/react";
import { FC } from "react";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

/**
 * トグルスイッチコンポーネント
 * @param checked - スイッチの状態
 * @param onChange - 状態変更時のコールバック
 * @param disabled - 無効状態
 */
const Switch: FC<SwitchProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <HUSwitch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={
        "group inline-flex h-6 w-11 items-center rounded-full bg-disabled transition-colors disabled:cursor-not-allowed  disabled:opacity-25 data-[checked]:bg-primary"
      }
    >
      <span
        className={
          "size-4 translate-x-1 rounded-full bg-white transition-transform group-data-[checked]:translate-x-6"
        }
      />
    </HUSwitch>
  );
};

export default Switch;
