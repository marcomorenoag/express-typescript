import express from 'express'
import morgan from 'morgan'

import * as diaryServices from '../services/diary.service'
import toNewDiaryEntry from '../utils'

const router = express.Router()

// Morgan adds logs in terminal of attended requests
router.use(morgan('dev'))

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)

  return ((diary != null) ? res.send(diary) : res.sendStatus(404))
})

router.post('/', (req, res) => {
  try {
    // const { date, weather, visibility, comment } = req.body

    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
