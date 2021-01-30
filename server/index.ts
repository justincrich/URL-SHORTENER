/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import { ShortUrl } from './ShortUrl'

const app = express()
app.use(bodyParser.json())
const UrlMachine = new ShortUrl()

app.get<{ shortUrl: string }, string>('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params
    try {
        const longUrl = UrlMachine.getLongUrl(shortUrl)
        res.redirect(longUrl)
    } catch (e) {
        res.status(400).send(`Invalid short url: ${shortUrl}`)
    }
})

app.get<{ shortUrl: string }, string>('/:shortUrl/long', (req, res) => {
    const { shortUrl } = req.params
    try {
        res.status(200).send(UrlMachine.getLongUrl(shortUrl))
    } catch (e) {
        res.status(400).send('Invalid short URL')
    }
})

app.put<undefined, string, { url: string }>('/', (req, res): void => {
    const { url } = req.body
    const shortUrl = UrlMachine.generateShortUrl(url)
    res.send(shortUrl)
})

app.listen(5000, () => {
    console.log('Running API on port 5000')
})
