import express from 'express'
import https from 'https'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3333

const allowedOrigins = ['addict-next.vercel.app', 'http://localhost']
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    }
  })
)
// app.use(cors({ origin: true }))

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
