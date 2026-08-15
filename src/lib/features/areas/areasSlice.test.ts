import areasReducer, { clearSelectedArea, setSelectedArea } from "./areasSlice";

import type { SelectedArea } from "@/lib/jma";

const selectedArea: SelectedArea = {
  class20: {
    code: "1310100",
    name: "千代田区",
    enName: "Chiyoda-ku",
    kana: "ちよだく",
    parent: "130010",
  },
};

describe("areasSlice", () => {
  it("選択地域をRedux stateに一時的に保持する", () => {
    const setItem = jest.spyOn(Storage.prototype, "setItem");

    const state = areasReducer(undefined, setSelectedArea(selectedArea));

    expect(state.selectedArea).toEqual(selectedArea);
    expect(setItem).not.toHaveBeenCalled();
  });

  it("選択地域をRedux stateからクリアする", () => {
    const removeItem = jest.spyOn(Storage.prototype, "removeItem");
    const selectedState = areasReducer(
      undefined,
      setSelectedArea(selectedArea)
    );

    const state = areasReducer(selectedState, clearSelectedArea());

    expect(state.selectedArea).toEqual({});
    expect(removeItem).not.toHaveBeenCalled();
  });
});
