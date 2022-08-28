export default function () {
  if (/(iPhone)/i.test(navigator.userAgent)) {
    return "iphone";
  } else if (/(iPad)/i.test(navigator.userAgent)) {
    return "ipad";
  } else if (/(Android)/i.test(navigator.userAgent)) {
    return "android";
  } else {
    return "pc";
  }
}
