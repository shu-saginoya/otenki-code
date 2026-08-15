import { generateAreaOptions, getSelectedAreaByClass20Code } from "./utils";

import type { JmaAreas } from "@/lib/jma";

const areas: JmaAreas = {
  centers: {
    center: {
      name: "関東甲信地方",
      enName: "Kanto-Koshin",
      officeName: "東京",
      children: ["office"],
    },
    otherCenter: {
      name: "東海地方",
      enName: "Tokai",
      officeName: "名古屋",
      children: ["otherOffice"],
    },
  },
  offices: {
    office: {
      name: "東京都",
      enName: "Tokyo",
      officeName: "東京",
      parent: "center",
      children: ["class10"],
    },
    otherOffice: {
      name: "静岡県",
      enName: "Shizuoka",
      officeName: "静岡",
      parent: "otherCenter",
      children: [],
    },
  },
  class10s: {
    class10: {
      name: "東京地方",
      enName: "Tokyo",
      parent: "office",
      children: ["class15"],
    },
  },
  class15s: {
    class15: {
      name: "東京23区",
      enName: "Tokyo 23 Wards",
      parent: "class10",
      children: ["class20"],
    },
  },
  class20s: {
    class20: {
      name: "千代田区",
      enName: "Chiyoda-ku",
      kana: "ちよだく",
      parent: "class15",
    },
  },
};

describe("地域選択ユーティリティ", () => {
  it("class20から選択済み地域の階層を復元する", () => {
    expect(getSelectedAreaByClass20Code(areas, "class20")).toEqual({
      center: { ...areas.centers.center, code: "center" },
      office: { ...areas.offices.office, code: "office" },
      class10: { ...areas.class10s.class10, code: "class10" },
      class15: { ...areas.class15s.class15, code: "class15" },
      class20: { ...areas.class20s.class20, code: "class20" },
    });
  });

  it("地方の選択に応じて都道府県候補を絞り込む", () => {
    const { officeOptions } = generateAreaOptions(areas, {
      center: "center",
    });

    expect(officeOptions).toEqual({ office: areas.offices.office });
  });
});
