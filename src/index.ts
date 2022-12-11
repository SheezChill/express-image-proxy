import express from 'express'
import https from 'https'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3333

const whitelist = [/addict-next.vercel.app/, /localhost/]
app.use(
  cors({
    origin: whitelist
  })
)

app.get('/', (req, res) => {
  res.send('/image?url=[url]')
})

app.get('/image', (req, res) => {
  const url = req.query.url as string

  const request = https.get(url, (response) => {
    const contentType = response.headers['content-type']
    if (!contentType) {
      res.send('error')
      return
    }

    res.setHeader('Content-Type', contentType)

    response.pipe(res)
  })

  request.on('error', (e) => {
    console.error(e)
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
