const http = require('http')
const router = require('./router')

const port = 8000
const server = http.createServer((req, res) => {
  console.log(req.url)
  router(req, res)
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})
