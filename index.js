import express from 'express'
import { query } from './query.js'
import { getHoursConfig } from './config.js'
import dotenv from 'dotenv'
import { sendEmail } from './email.js'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('YO!')
})

app.get('/query', async (req, res) => {
  const hours = getHoursConfig()
  console.log('Querying with hours', hours)
  const result = await query(hours)
  res.json(result)
})

app.post('/email', async (req, res) => {
  await sendEmail(req.body.to, req.body.subject, req.body.text)
  res.status(200).send('OK')
})

app.get('/checkAndInform', async (req, res) => {
  const result = await query(hours)
  if (result.length > 0) {
    await sendEmail("safakadir@gmail.com", "Spor Aş Kayseri - YENİ SLOT", JSON.stringify(result, null, 2))
  }
  else {
    await sendEmail("safakadir@gmail.com", "Spor Aş Kayseri - Slot Yok", "Maalesef istediğiniz saatlerde boş slot henüz yok.")
  }
  res.status(200).send({length: result.length})
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on port', port)
})
