import { ApiClient } from './ApiClient'

export class UrlClient extends ApiClient {
    getLongUrl = async (shortUrl: string): Promise<string> => {
        const longUrl = await this._request<string>({
            path: `/${shortUrl}/long`,
            method: 'get',
        })
        return longUrl
    }

    getShortUrl = async (longUrl: string): Promise<string> => {
        const shortUrl = await this._request<string>({
            path: `/`,
            method: 'put',
            data: {
                url: longUrl,
            },
        })
        return shortUrl
    }
}
