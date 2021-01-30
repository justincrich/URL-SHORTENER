import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface State {
    shortUrls: string[]
}

const initialState: State = {
    shortUrls: [],
}

const REDUCER_NAME = 'shortUrls'

const urlSlice = createSlice({
    name: REDUCER_NAME,
    initialState,
    reducers: {
        addShortUrl(draft, action: PayloadAction<string>) {
            draft.shortUrls.push(action.payload)
        },
    },
})

export const { addShortUrl } = urlSlice.actions

interface AppState {
    urls: State
}

export const selectShortUrls = ({ urls }: AppState): string[] => urls.shortUrls

export const { reducer } = urlSlice
