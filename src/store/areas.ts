// 対象エリアを管理するストア

import { defineStore } from "pinia";
import { ref, computed, readonly } from "vue";
import { useLocalStorage } from "@/composables/utils/useLocalStorage";

// ローカルストレージの設定
const keyName = "areas";
const { get, set } = useLocalStorage(keyName);

export const useAreasStore = defineStore("areas", () => {
  // State
  type Area = {
    key: string;
    name: string;
  };

  // エリアの管理
  const areaLv1 = ref<Area | undefined>();
  const areaLv2 = ref<Area | undefined>();
  const areaLv3 = ref<Area | undefined>();

  // Getters
  // すべてのエリアがセットされているか
  const isSetAll = computed<boolean>(() => {
    return Boolean(areaLv1.value && areaLv2.value && areaLv3.value);
  });

  // エリアのリスト
  const areaList = computed(() => {
    if (isSetAll.value) {
      return [areaLv1.value, areaLv2.value, areaLv3.value];
    } else {
      return undefined;
    }
  });

  // Actions
  // エリアを更新する
  const setArea = (lv1: Area, lv2: Area, lv3: Area): void => {
    areaLv1.value = lv1;
    areaLv2.value = lv2;
    areaLv3.value = lv3;
    saveArea();
  };
  // エリアの初期値をセット
  const initArea = (): void => {
    const savedData = get();
    if (savedData) {
      const jsonParse = JSON.parse(savedData);
      areaLv1.value = jsonParse[0];
      areaLv2.value = jsonParse[1];
      areaLv3.value = jsonParse[2];
    }
  };
  // エリアをローカルストレージに保存する
  const saveArea = (): void => {
    if (isSetAll.value) {
      const jsonData = JSON.stringify(areaList.value);
      set(jsonData);
    }
  };

  // Init
  initArea();

  return {
    areaLv1: readonly(areaLv1),
    areaLv2: readonly(areaLv2),
    areaLv3: readonly(areaLv3),
    isSetAll,
    setArea,
    initArea,
  };
});
