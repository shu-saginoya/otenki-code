// 文字変換に関する純粋関数群
/**
 * 全角英字を半角に変換する
 */
const toHalfWidthAlpha = (str: string): string =>
  str.replace(/[Ａ-Ｚａ-ｚ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

/**
 * 全角数字を半角に変換する
 */
const toHalfWidthNum = (str: string): string =>
  str.replace(/[０-９]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

/**
 * 全角記号を半角に変換する
 */
const toHalfWidthSymbol = (str: string): string =>
  str.replace(/[！-／：-＠［-｀｛-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );

/**
 * 全角スペースを半角に変換する
 */
const toHalfWidthSpace = (str: string): string => str.replace(/　/g, " ");

/**
 * 指定された文字を削除する
 */
const removeCharacters =
  (pattern: string | RegExp) =>
  (str: string): string =>
    str.replace(
      pattern instanceof RegExp
        ? pattern
        : new RegExp([...pattern].map((ch) => `\\${ch}`).join("|"), "g"),
      ""
    );

/**
 * テキスト変換のオプション
 */
export type TextConversionOptions = {
  /**
   * 全角英字を半角に変換
   */
  toHalfAlpha?: boolean;
  /**
   * 全角数字を半角に変換
   */
  toHalfNum?: boolean;
  /**
   * 全角記号を半角に変換
   */
  toHalfSymbol?: boolean;
  /**
   * 全角スペースを半角に変換
   */
  toHalfSpace?: boolean;
  /**
   * 削除する文字のパターン
   * 文字列または正規表現で指定
   */
  removeChars?: string | RegExp;
};

/**
 * 文字列を指定されたルールに従って変換する
 *
 * @description
 * この関数は、全角文字を半角に変換したり、特定の文字を削除したりするための
 * ユーティリティ関数です。複数の変換オプションを組み合わせることができます。
 *
 * @param str - 変換する文字列
 * @param options - 変換オプション
 * @param options.toHalfAlpha - 全角英字（ＡＢＣ）を半角(ABC)に変換
 * @param options.toHalfNum - 全角数字（１２３）を半角(123)に変換
 * @param options.toHalfSymbol - 全角記号（！？）を半角(!?)に変換
 * @param options.toHalfSpace - 全角スペース（　）を半角( )に変換
 * @param options.removeChars - 削除したい文字を文字列または正規表現で指定
 * @returns 変換後の文字列
 *
 *  * @example
 * ```typescript
 * // 全角英数字を半角に変換
 * convertText("ＡＢＣ１２３", {
 *   toHalfAlpha: true,
 *   toHalfNum: true
 * }); // => "ABC123"
 *
 * // 全角スペースを半角に変換し、タグを削除
 * convertText("Ｈｅｌｌｏ　<Ｗｏｒｌｄ>", {
 *   toHalfSpace: true,
 *   removeChars: /[<>]/g
 * }); // => "Ｈｅｌｌｏ Ｗｏｒｌｄ"
 * ```
 */
export const convertText = (
  str: string,
  options: TextConversionOptions = {}
): string => {
  const conversions = [
    [options.toHalfAlpha, toHalfWidthAlpha],
    [options.toHalfNum, toHalfWidthNum],
    [options.toHalfSymbol, toHalfWidthSymbol],
    [options.toHalfSpace, toHalfWidthSpace],
    [options.removeChars, removeCharacters(options.removeChars ?? "")],
  ] as const;

  return conversions.reduce(
    (result, [shouldApply, converter]) =>
      shouldApply ? converter(result) : result,
    str
  );
};
