import dayjs from "dayjs";
import "dayjs/locale/ja";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";

import type { Dayjs } from "dayjs";

// プラグイン適用
dayjs.extend(utc); // タイムゾーンサポートに必要
dayjs.extend(timezone); // タイムゾーンサポート
dayjs.extend(relativeTime); // 相対時間表示 (例: ○時間前)
dayjs.extend(isSameOrAfter); // 日付比較機能
dayjs.extend(isSameOrBefore); // 日付比較機能
dayjs.extend(weekday); // 週の操作
dayjs.extend(customParseFormat); // カスタム日付フォーマットのパース

// 日本語ロケールとタイムゾーンを設定
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

export type { Dayjs };
export default dayjs;
