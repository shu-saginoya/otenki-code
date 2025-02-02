export type AreaCenters = {
  [key: string]: {
    name: string;
    enName: string;
    officeName: string;
    children: string[];
  };
};
export type AreaOffices = {
  [key: string]: {
    name: string;
    enName: string;
    officeName: string;
    parent: string;
    children: string[];
  };
};
export type AreaClass10s = {
  [key: string]: {
    name: string;
    enName: string;
    parent: string;
    children: string[];
  };
};
export type AreaClass15s = {
  [key: string]: {
    name: string;
    enName: string;
    parent: string;
    children: string[];
  };
};
export type AreaClass20s = {
  [key: string]: {
    name: string;
    enName: string;
    kana: string;
    parent: string;
  };
};
export type Areas = {
  centers: AreaCenters;
  offices: AreaOffices;
  class10s: AreaClass10s;
  class15s: AreaClass15s;
  class20s: AreaClass20s;
};
