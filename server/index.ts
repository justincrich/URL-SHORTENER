/* eslint-disable no-console */
import express from 'express'
import bodyParser from 'body-parser'
import { ShortUrl } from './ShortUrl'

const app = express()
app.use(bodyParser.json())

// TODO: pass database reference to persist data between builds
// TODO: handle errors better to support other edge cases: overflow, server busy, etc

const UrlMachine = new ShortUrl()

app.get<{ shortUrl: string }, string>('/:shortUrl', (req, res) => {
    const { shortUrl } = req.params
    try {
        const longUrl = UrlMachine.getLongUrl(shortUrl)
        res.redirect(longUrl)
    } catch (e) {
        res.status(400)
        res.send(e.message)
    }
})

app.get<{ shortUrl: string }, string>('/:shortUrl/long', (req, res) => {
    const { shortUrl } = req.params
    try {
        res.status(200).send(UrlMachine.getLongUrl(shortUrl))
    } catch (e) {
        res.status(400)
        res.send(e.message)
    }
})

app.put<undefined, string, { url: string }>('/', (req, res): void => {
    const { url } = req.body
    try {
        const shortUrl = UrlMachine.generateShortUrl(url)
        res.send(shortUrl)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.listen(5000, () => {
    console.log('Running API on port 5000')
})
