import axios from "axios"
import moment from "moment"

const URL = "http://kayseri.tekdenhastaneleri.com:8080/randevu/get_appointment_time.php"

const doctorId = 210
const departmentId = 8

export async function query(days) {

  const result = []
  for (let i = 1; i <= days; i++) {
    const dayMoment = moment().add(i, 'days')
    if (dayMoment.day() == 0) {
      i--
      continue // skip sunday
    }
    const dayStr = dayMoment.format("DD.MM.YYYY")
    const url = `${URL}?dr_id=${doctorId}&dept_id=${departmentId}&day=${dayStr}`
    const { data } = await axios.get(url)
    const subResult = data.Rows.slice(1)
    console.log(subResult)
    if (subResult[0].day.includes("Dolu")) continue
    for (let slot of subResult) {
      result.push({day: dayStr, time: slot.time})
    }
  }
  return result
}
