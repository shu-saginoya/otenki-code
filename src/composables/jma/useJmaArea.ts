// 地域情報を管理

import { ref, watch, readonly } from "vue";
import { useFetch } from "@/composables/utils/useFetch";

import type {
  Areas,
  AreaCenters,
  AreaOffices,
  AreaClass10s,
  AreaClass15s,
  AreaClass20s,
} from "@/types/jmaAreas";

export const useJmaArea = () => {
  // エリアの情報を公開しているURL
  const url = "https://www.jma.go.jp/bosai/common/const/area.json";

  // 取得できたデータ
  const { data, error } = useFetch(url);

  //取得したデータを分割
  const centers = ref<AreaCenters>();
  const offices = ref<AreaOffices>();
  const class10s = ref<AreaClass10s>();
  const class15s = ref<AreaClass15s>();
  const class20s = ref<AreaClass20s>();
  watch(data, () => {
    if (data.value) {
      const areas: Areas = data.value;
      centers.value = areas.centers;
      offices.value = areas.offices;
      class10s.value = areas.class10s;
      class15s.value = areas.class15s;
      class20s.value = areas.class20s;
    }
  });

  return {
    centers: readonly(centers),
    offices: readonly(offices),
    class10s: readonly(class10s),
    class15s: readonly(class15s),
    class20s: readonly(class20s),
    error,
  };
};
