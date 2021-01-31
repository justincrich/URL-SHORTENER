import axios from 'axios'

export type TranslationFn<Value> = (unknown: unknown) => Value

export const getTimestamp = (isCreate?: boolean): DatetimeType => {
    const timestamp = new Date().valueOf()
    const dateTime: DatetimeType = { updatedAt: timestamp }
    if (isCreate) {
        dateTime.createdAt = timestamp
    }
    return dateTime
}

type DatetimeType = { createdAt?: number; updatedAt: number }

export abstract class ApiClient {
    protected _request = async <Result = {}>(request: {
        path: string
        data?: object
        method: 'get' | 'put' | 'post' | 'delete'
    }): Promise<Result> => {
        const { path, data, method } = request
        const res = await axios({
            url: `http://localhost:3000/${path}`,
            data,
            method,
        })

        return res.data as Result
    }
}

// export const subscribe = (collection: string, key: string) => {}
