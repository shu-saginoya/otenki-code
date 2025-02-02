export type AreaTypeA = {
  area: {
    name: string;
    code: string;
  };
  weatherCodes: string[];
  weathers: string[];
  winds: string[];
  waves: string[];
};
export type AreaTypeB = {
  area: {
    name: string;
    code: string;
  };
  pops: string[];
};
export type AreaTypeC = {
  area: {
    name: string;
    code: string;
  };
  temps: string[];
};
export type AreaTypeD = {
  area: {
    name: string;
    code: string;
  };
  weatherCodes: string[];
  pops: string[];
  reliabilities: string[];
};
export type AreaTypeE = {
  area: {
    name: string;
    code: string;
  };
  tempsMin: string[];
  tempsMinUpper: string[];
  tempsMinLower: string[];
  tempsMax: string[];
  tempsMaxUpper: string[];
  tempsMaxLower: string[];
};
export type AreaTypeF = {
  area: {
    name: string;
    code: string;
  };
  min: string[];
  max: string[];
};

export type LatestForecast = {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: [
    {
      timeDefines: string[];
      areas: AreaTypeA[];
    },
    {
      timeDefines: string[];
      areas: AreaTypeB[];
    },
    {
      timeDefines: string[];
      areas: AreaTypeC[];
    },
  ];
};
export type WeeklyForecast = {
  publishingOffice: string;
  reportDatetime: string;
  timeSeries: [
    {
      timeDefines: string[];
      areas: AreaTypeD[];
    },
    {
      timeDefines: string[];
      areas: AreaTypeE[];
    },
    {
      timeDefines: string[];
      areas: AreaTypeF[];
    },
  ];
  tempAverage: {
    areas: AreaTypeF[];
  };
  precipAverage: {
    areas: AreaTypeF[];
  };
};

export type ForecastList = [LatestForecast, WeeklyForecast];
