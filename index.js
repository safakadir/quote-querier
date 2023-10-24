import express from 'express'
import { query as sporasQuery } from './sporas/query.js'
import { query as tekdenQuery } from './tekden/query.js'
import { getHoursConfig } from './sporas/config.js'
import dotenv from 'dotenv'
import { sendEmail } from './email.js'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('YO!')
})

app.get('/query/sporas', async (req, res) => {
  const hours = getHoursConfig()
  const result = await sporasQuery(hours)
  res.json(result)
})

app.get('/query/tekden', async (req, res) => {
  const result = await tekdenQuery(6)
  res.json(result)
})

app.post('/email', async (req, res) => {
  await sendEmail(req.body.to, req.body.subject, req.body.text)
  res.status(200).send('OK')
})

app.get('/checkAndInform/sporas', async (req, res) => {
  const hours = getHoursConfig()
  const result = await sporasQuery(hours)
  if (result.length > 0) {
    await sendEmail("safakadir@gmail.com", "Spor Aş Kayseri - YENİ SLOT", JSON.stringify(result, null, 2))
  }
  else if (process.env.SEND_NORESULTS === "true") {
    await sendEmail("safakadir@gmail.com", "Spor Aş Kayseri - Slot Yok", "Maalesef istediğiniz saatlerde boş slot henüz yok.")
  }
  res.status(200).send({length: result.length})
})

app.get('/checkAndInform/tekden', async (req, res) => {
  const result = await tekdenQuery(process.env.TEKDEN_SHORT_DAYS || 3)
  if (result.length > 0) {
    await sendEmail("safakadir@gmail.com", "Tekden Kayseri Hastanesi - YENİ SLOT", JSON.stringify(result, null, 2))
  }
  res.status(200).send({length: result.length})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on port', port)
})
