import express from 'express'
import { query } from './query.js'
import { getHoursConfig } from './config.js'
import dotenv from 'dotenv'

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

app.get('/email', async (req, res) => {
  throw new Error("Not implemented")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Listening on port', port)
})
