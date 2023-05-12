const express = require('express')
const router = express.Router()

const notesData = []

router.get('/leave', function (req, res, next) {
  res.render('leaveNote', { title: 'Leave a Note' })
})

router.post('/leave', function (req, res, next) {
  notesData.push(req.body.note)
  res.redirect('/notes/read')
})

router.get('/read', function (req, res, next) {
  res.render('readNotes', { title: 'Read Notes', notes: notesData })
})

module.exports = router
