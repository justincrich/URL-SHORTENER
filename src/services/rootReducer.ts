import { combineReducers } from '@reduxjs/toolkit'
import { reducer as urls } from './urls'

export const rootReducer = combineReducers({
    urls,
})

export type RootState = ReturnType<typeof rootReducer>
