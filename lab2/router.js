const fs = require('fs')
const qs = require('querystring')

const headers = {
  'Content-Type': 'text/html',
}

function handleRoot(req, res) {
  res.writeHead(200, headers)
  res.end(`
    <h1>Hello Node!</h1>
    <a href="/read-message">Read Message</a><br>
    <a href="/write-message">Write Message</a>
  `)
}

function handleReadMessage(req, res) {
  fs.readFile('message.txt', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(200, headers)
        res.end(`
          <h1>No message file found.</h1>
        `)
      } else {
        console.error(err)

        res.writeHead(500, headers)
        res.end('Server error')
      }
      return
    }

    res.writeHead(200, headers)
    res.end(`
      <h1>Your message below</h1>
      <p>${data}</p>
    `)
  })
}

function handleWriteMessage(req, res) {
  if (req.method === 'GET') {
    res.writeHead(200, headers)
    res.end(`
      <form method="POST" action="/write-message">
        <input type="text" name="message">
        <button type="submit">Submit</button>
      </form>
    `)
  } else if (req.method === 'POST') {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const postData = qs.parse(body)

      fs.writeFile('message.txt', postData.message, (err) => {
        if (err) {
          console.error(err)

          res.writeHead(500, headers)
          res.end('Server error')
          return
        }

        res.writeHead(200, headers)
        res.end(`
          <h1>Message saved</h1>
        `)
      })
    })
  }
}

function handleNotFound(req, res) {
  res.writeHead(404, headers)
  res.end('<h1>Page not found.</h1>')
}

function router(req, res) {
  switch (req.url) {
    case '/':
      handleRoot(req, res)
      break
    case '/read-message':
      handleReadMessage(req, res)
      break
    case '/write-message':
      handleWriteMessage(req, res)
      break
    default:
      handleNotFound(req, res)
      break
  }
}

module.exports = router
