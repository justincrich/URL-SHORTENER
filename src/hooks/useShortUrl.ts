import { useState } from 'react'
import { UrlClient } from '../clients/UrlClient'

const client = new UrlClient()

export const useUrlShortener = (): {
    isLoading: boolean
    error: null | string
    shortUrl: string | null
    getShortUrl: (longUrl: string) => Promise<string | null>
} => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<null | string>(null)
    const [shortUrl, setShortUrl] = useState<string | null>(null)

    const handleShortUrlRequest = async (
        longUrl: string
    ): Promise<string | null> => {
        if (isLoading) {
            setError('Short URL generation in process')
            return null
        }
        setLoading(true)
        setError(null)
        setShortUrl(null)
        try {
            const value = await client.getShortUrl(longUrl)
            const urlValue = `http://localhost:5000/${value}`
            setShortUrl(urlValue)
            setLoading(false)
            setError(null)
            return urlValue
        } catch (e) {
            setError(e.message)
            setLoading(false)
            setShortUrl(null)
            return null
        }
    }

    return {
        isLoading,
        error,
        shortUrl,
        getShortUrl: handleShortUrlRequest,
    }
}
