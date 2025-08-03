import type {
  JmaAreaCode,
  JmaCenter,
  JmaOffice,
  JmaClass10,
  JmaClass15,
  JmaClass20,
} from "@/lib/jma";

export type SelectedAreaItem<T> = T & { code: JmaAreaCode };

// 地域選択のための型定義
export type SelectedArea = {
  center?: SelectedAreaItem<JmaCenter>;
  office?: SelectedAreaItem<JmaOffice>;
  class10?: SelectedAreaItem<JmaClass10>;
  class15?: SelectedAreaItem<JmaClass15>;
  class20?: SelectedAreaItem<JmaClass20>;
};

// 地域選択の状態
export type AreaSelectionState = {
  selectedArea: SelectedArea;
  isLoading: boolean;
  error: string | null;
};
