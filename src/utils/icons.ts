import { MdAdd } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { MdCached } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdHelp } from "react-icons/md";

export const iconOptions = {
  add: MdAdd,
  arrowBack: MdArrowBack,
  arrowForward: MdArrowForward,
  cached: MdCached,
  check: MdCheck,
  close: MdClose,
  help: MdHelp,
};

export type IconOptions = keyof typeof iconOptions;
