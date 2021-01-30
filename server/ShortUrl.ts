export class ShortUrl {
    private _nextId: number

    private _db: Array<{ long: string; short: string }>

    constructor(db = [], seedId = 1) {
        this._nextId = seedId
        this._db = db
    }

    private _translateIdToShortUrl = (id: number): string => {
        if (id === 0) {
            return '000000'
        }
        // NOTE:
        // id = c^n
        // c = character
        // n = number of characters
        const characters =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const urlArr: string[] = []
        let mutableId = id
        while (mutableId > 0) {
            const charIdx = mutableId % 62
            urlArr.push(characters[charIdx])
            mutableId = Math.floor(mutableId / 62)
        }

        let url: string = urlArr.reverse().join('')

        while (url.length < 6) {
            url = `0${url}`
        }
        return url
    }

    private _translateShortUrlToId = (shortUrl: string): number => {
        const url = shortUrl.replace(/^0+(?!$)/, '')
        let id = 0
        for (let i = 0; i < url.length; i++) {
            const charCode = url.charCodeAt(i)
            if (
                charCode >= '0'.charCodeAt(0) &&
                charCode <= '9'.charCodeAt(0)
            ) {
                id = id * 62 + charCode - '0'.charCodeAt(0)
            }
            if (
                charCode >= 'a'.charCodeAt(0) &&
                charCode <= 'z'.charCodeAt(0)
            ) {
                id = id * 62 + charCode - 'a'.charCodeAt(0) + 26
            }
            if (
                charCode >= 'A'.charCodeAt(0) &&
                charCode <= 'Z'.charCodeAt(0)
            ) {
                id = id * 62 + charCode - 'Z'.charCodeAt(0) + 52
            }
        }
        return id
    }

    generateShortUrl(url: string): string {
        const shortUrl = this._translateIdToShortUrl(this._nextId)
        this._db[this._nextId] = {
            long: url,
            short: shortUrl,
        }
        this._nextId += 1
        return shortUrl
    }

    getLongUrl(shortUrl: string): string {
        const id = this._translateShortUrlToId(shortUrl)
        const { long } = this._db[id] || {}
        if (!long) {
            throw new Error('Invalid')
        }
        return long
    }
}
