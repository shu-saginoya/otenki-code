import { convertText, type TextConversionOptions } from "./index";

describe("Text Conversion Utils", () => {
  // 個別の文字種の変換テスト
  describe("convertText with single conversion type", () => {
    it("converts full-width alphabet to half-width", () => {
      const options: TextConversionOptions = { toHalfAlpha: true };
      expect(convertText("ＡＢＣａｂｃ", options)).toBe("ABCabc");
      expect(convertText("Ｈｅｌｌｏ　Ｗｏｒｌｄ", options)).toBe(
        "Hello　World"
      );
    });

    it("converts full-width numbers to half-width", () => {
      const options: TextConversionOptions = { toHalfNum: true };
      expect(convertText("１２３４５", options)).toBe("12345");
      expect(convertText("テスト１２３", options)).toBe("テスト123");
    });

    it("converts full-width symbols to half-width", () => {
      const options: TextConversionOptions = { toHalfSymbol: true };
      expect(convertText("！？＠＃＄％", options)).toBe("!?@#$%");
      expect(convertText("テスト！", options)).toBe("テスト!");
    });

    it("converts full-width spaces to half-width", () => {
      const options: TextConversionOptions = { toHalfSpace: true };
      expect(convertText("Hello　World", options)).toBe("Hello World");
      expect(convertText("テスト　テスト", options)).toBe("テスト テスト");
    });
  });

  // 複数の文字種を組み合わせた変換テスト
  describe("convertText with multiple conversion types", () => {
    it("converts full-width alphanumeric characters", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
      };
      expect(convertText("ＡＢＣ１２３", options)).toBe("ABC123");
    });

    it("converts full-width alphanumeric and symbols", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
      };
      expect(convertText("ＡＢＣ１２３！？", options)).toBe("ABC123!?");
    });

    it("converts all full-width characters", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
        toHalfSpace: true,
      };
      expect(convertText("ＡＢＣ　１２３　！？", options)).toBe("ABC 123 !?");
    });
  });

  // 文字削除のテスト
  describe("convertText with character removal", () => {
    it("removes specified characters using string pattern", () => {
      const options: TextConversionOptions = { removeChars: "<>" };
      expect(convertText("Hello <World>", options)).toBe("Hello World");
    });

    it("removes specified characters using regex pattern", () => {
      const options: TextConversionOptions = { removeChars: /[<>]/g };
      expect(convertText("Hello <World>", options)).toBe("Hello World");
    });

    it("combines character removal with other conversions", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfSpace: true,
        removeChars: /[<>]/g,
      };
      expect(convertText("Ｈｅｌｌｏ　<Ｗｏｒｌｄ>", options)).toBe(
        "Hello World"
      );
    });
  });

  // エッジケースのテスト
  describe("convertText edge cases", () => {
    it("returns the original string when no options are provided", () => {
      expect(convertText("ＡＢＣ１２３！？　")).toBe("ＡＢＣ１２３！？　");
    });

    it("handles empty string", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
        toHalfSpace: true,
      };
      expect(convertText("", options)).toBe("");
    });

    it("handles string with no convertible characters", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
        toHalfSpace: true,
      };
      expect(convertText("あいうえお", options)).toBe("あいうえお");
    });

    it("preserves half-width characters", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
        toHalfSpace: true,
      };
      expect(convertText("ABC123!? あいうえお", options)).toBe(
        "ABC123!? あいうえお"
      );
    });
  });

  // 変換順序のテスト
  describe("convertText conversion order", () => {
    it("applies conversions in the correct order", () => {
      const options: TextConversionOptions = {
        toHalfAlpha: true,
        toHalfNum: true,
        toHalfSymbol: true,
        toHalfSpace: true,
      };
      const input = "Ｔｅｓｔ　１２３　！？";
      const expected = "Test 123 !?";
      expect(convertText(input, options)).toBe(expected);
    });
  });
});
