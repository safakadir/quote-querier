export function getHoursConfig() {
  if (!!process.env.HOURS) {
    return process.env.HOURS.split(",").map(h => parseInt(h))
  }
  return [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]
}
