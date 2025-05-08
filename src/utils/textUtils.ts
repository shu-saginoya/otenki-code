/**
 * 全角英数字と記号を半角に変換する
 * @param str - 変換する文字列
 * @returns 変換後の文字列
 */
export const toHalfWidth = (str: string): string => {
  return str.replace(/[！-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );
};
