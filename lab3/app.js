const express = require('express')
const path = require('path')
const indexRouter = require('./routes/index')
const notesRouter = require('./routes/notes')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/notes', notesRouter)

app.use((req, res, next) => {
  res.status(404)
  res.render('404')
})

app.listen(3000, () => {
  console.log('Guestbook app listening on port 3000!')
})

module.exports = app
