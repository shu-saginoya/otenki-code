import { GoBell } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdCached } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdHelp } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdMap } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";

export const iconMap = {
  add: MdAdd,
  arrowBack: MdArrowBack,
  arrowBackUp: TbArrowBackUp,
  arrowForward: MdArrowForward,
  bell: GoBell,
  cached: MdCached,
  check: MdCheck,
  close: MdClose,
  help: MdHelp,
  login: MdLogin,
  map: MdMap,
  publishedWithChanges: MdPublishedWithChanges,
};

export type Icon = keyof typeof iconMap;
