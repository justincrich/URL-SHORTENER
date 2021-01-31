import { ShortUrl } from '../ShortUrl'

const urls: string[] = ['http://google.com']

describe('ShortUrl unit tests', () => {
    let urlClient: ShortUrl
    const autoGen = (maxTestId): string | null => {
        if (!urlClient) return null
        const [url] = urls
        let id = 1
        let shortUrl = ''
        let longUrl = ''
        while (id <= maxTestId) {
            longUrl = `${url}/${id}`
            shortUrl = urlClient.generateShortUrl(longUrl)
            id += 1
        }
        return shortUrl
    }
    beforeEach(() => {
        urlClient = new ShortUrl()
    })
    it('url client seeds with correct defaults', () => {
        const nextId = (urlClient as any)._nextId
        const db = (urlClient as any)._db
        expect(nextId).toEqual(1)
        expect(db.length).toEqual(0)
    })
    it('can url id can be translated into an encoded path', () => {
        const testId = 999999999
        const encodedUrl = '15FTGf'
        const nextShortPath = (urlClient as any)._translateIdToShortUrl(testId)

        expect(nextShortPath).toEqual(encodedUrl)
    })
    it('encoding multiple urls generates consistant shortUrls', () => {
        const [url] = urls
        const maxTestId = 999
        const testUrl = '0000g7'
        const lastShortUrl = autoGen(maxTestId)
        expect(lastShortUrl).toEqual(testUrl)
        expect(urlClient.getLongUrl(testUrl)).toEqual(`${url}/${maxTestId}`)
    })
    it('should catch requests for non existant shortUrls', () => {
        let error: Error | null = null
        try {
            autoGen(999)
            urlClient.getLongUrl('999999')
        } catch (e) {
            error = e
        }
        expect(error).toBeTruthy()
    })
    it('should catch trying to shorten a url twice', () => {
        const [url] = urls
        let error: Error | null = null
        try {
            autoGen(999)
            urlClient.generateShortUrl(`${url}/1`)
        } catch (e) {
            error = e
        }
        expect(error).toBeTruthy()
    })
})
