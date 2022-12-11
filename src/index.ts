import express from 'express'
import https from 'https'

const app = express()
const port = process.env.PORT || 3333

app.get('/', function (req, res) {
  res.send('lol')
})

app.get('/image', function (req, res) {
  const url = req.query.url as string

  const request = https.get(url, function (response) {
    const contentType = response.headers['content-type']

    res.setHeader('Content-Type', contentType as string)

    response.pipe(res)
  })

  request.on('error', function (e) {
    console.error(e)
  })
})

app.listen(3000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
