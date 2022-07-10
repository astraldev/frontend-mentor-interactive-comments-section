

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function parseDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}
export function jsonFilter(json){
  return json.filter((c, index) => {
    if (c instanceof Object) {
      c.id = index;
      return true;
    } else return false;
  })
}
