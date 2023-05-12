const express = require('express')
const router = express.Router()
const { addNote, getNotes } = require('../services/noteService')

router.get('/leave', (req, res, next) => {
  res.render('leaveNote')
})

router.post('/leave', (req, res, next) => {
  addNote(req.body.note)
  res.redirect('/notes/read')
})

router.get('/read', (req, res, next) => {
  res.render('readNotes', { notes: getNotes() })
})

module.exports = router
