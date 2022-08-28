export const timeFormat = function (time) {
  let tm = time.split(":");
  let mins = Number.parseFloat(tm[0]);
  let secs = Number.parseFloat(tm[1]);
  let seconds=Math.round(((mins*60+secs)*100))/100
  return seconds
};
