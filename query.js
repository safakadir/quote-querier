import axios from "axios"
import FormData from "form-data"

const URL = "https://fitness.sporaskayseri.com.tr/Ajax/GetSeanceNew.ashx"

const FACILITIES = [
  { id: 1, name: "TOKİ" },
  { id: 13, name: "BAHÇELİEVLER" },
  { id: 15, name: "KÖŞK" }
]
const HAVUZ_GROUP_ID = 1
const FULL_GROUP_ID = 5

export async function query(hours) {
  const result = []
  for (let f of FACILITIES) {
    const subResult = await queryFacility(f.id, hours)
    if (subResult.length == 0) continue
    result.push({name: f.name, seances: subResult.map(s => ({seans: s.quotaName, kalan: s.remainingQuota}))})
  }
  return result
}

async function queryFacility(facilityId, hours) {
  const responseFull = await axios.post(URL, formData(facilityId, FULL_GROUP_ID))
  const fullSeances = filter(responseFull.data.data, hours)
  //const responseHavuz = await axios.post(URL, formData(facilityId, HAVUZ_GROUP_ID))
  //const havuzSeances = filter(responseHavuz.data.data, hours)
  //return { ...fullSeances, ...havuzSeances }
  return fullSeances
}

function formData(facilityId, groupId) {
  const formData = new FormData();
  formData.append("facilityID", facilityId);
  formData.append("groupId", groupId);
  formData.append("quotaBranchId", 0);
  formData.append("memberId", 0);
  return formData;
}

function filter(seances, hours) {
  return seances.filter(s => hourCheck(hours, s.start) && 
                      s.remainingQuota > 0 && 
                      s.gender == 1);
}

function hourCheck(hours, hour) {
  const hourNumber = parseInt(hour.split(":")[0]);
  return hours.includes(hourNumber);
}
