import { FaGoogle } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdCached } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdHelp } from "react-icons/md";
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdMap } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { RiWindyFill } from "react-icons/ri";
import { TbArrowBackUp } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TiWaves } from "react-icons/ti";

export const iconMap = {
  add: MdAdd,
  arrowBack: MdArrowBack,
  arrowBackUp: TbArrowBackUp,
  arrowForward: MdArrowForward,
  bell: GoBell,
  cached: MdCached,
  check: MdCheck,
  close: MdClose,
  google: FaGoogle,
  help: MdHelp,
  login: MdLogin,
  logout: MdLogout,
  map: MdMap,
  person: MdPerson,
  publishedWithChanges: MdPublishedWithChanges,
  settings: MdSettings,
  partlySunny: TiWeatherPartlySunny,
  signin: FaSignInAlt,
  windy: RiWindyFill,
  waves: TiWaves,
};

export type Icon = keyof typeof iconMap;
