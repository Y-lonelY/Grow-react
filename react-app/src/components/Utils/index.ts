/**
 * 格式化时间展示
 * value 为秒数
 */
export function formatSeconds(value) {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value - h * 3600) / 60);
    const s = value % 60;
    let date = '';
    if (h > 0) {
        date += `${h > 1 ? `${h}hrs` : `${h}hr`}`;
    }

    if (m > 0) {
        date += `${m > 1 ? `${m}mins` : `${m}min`}`;
    }

    if (s > 0) {
        date += `${s > 1 ? `${s}secs` : `${s}sec`}`;
    }
    return date;
}