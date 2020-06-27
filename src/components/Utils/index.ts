/**
 * 格式化时间展示
 * value 为秒数
 */
export function formatSeconds(value) {
  const months = Math.floor(value / (3600 * 24 * 30))
  const d = Math.floor(value / (3600 * 24))
  const h = Math.floor((value - d * 3600 * 24) / 3600)
  const m = Math.floor((value - h * 3600) / 60)
  const s = value % 60
  let date = ""
  // 如果超过三个月，则直接展示月份
  if (months > 2) {
    date += `${months}months以上`
  } else {
    if (d > 0) {
      date += `${d > 1 ? `${d}days` : `${d}day`}`
    }
  
    if (h > 0) {
      date += `${h > 1 ? `${h}hrs` : `${h}hr`}`
    }
  
    // 如果小于两天，则展示分钟和秒数
    if (d < 2) {
      if (m > 0) {
        date += `${m > 1 ? `${m}mins` : `${m}min`}`
      }
    
      if (s > 0) {
        date += `${s > 1 ? `${s}secs` : `${s}sec`}`
      }
    }
  }
  
  return date
}
