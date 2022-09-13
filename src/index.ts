// ESModules
import express from 'express'
// const express = require('express') // commonjs
import morgan from 'morgan'
import diaryRouter from './routes/diaries'

// import { dirname } from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

const app = express()

app.use(express.json()) // middleware que transforma la req.body a un json

app.use('/api/diaries', diaryRouter)

// Morgan adds logs in terminal of attended requests
app.use(morgan('dev'))

const PORT = 3000

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
