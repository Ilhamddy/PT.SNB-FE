import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getLog: {
        data: null,
        loading: false,
        error: null
    },
    getLastUpdated: {
        lastUpdated: null,
        loading: false,
        error: null
    }
}

const loggerSlice = createSlice({
    name: "logger",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getLog: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getLog.data = null
                state.getLog.loading = true
            }
        ),
        getLogSuccess: (state, action) => {
            state.getLog.data = action.payload
            state.getLog.loading = false
        },
        getLogError: (state, action) => {
            state.getLog.error = action.payload
            state.getLog.loading = false
        },

        getLastUpdated: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getLastUpdated.lastUpdated = null
                state.getLastUpdated.loading = true
            }
        ),
        getLastUpdatedSuccess: (state, action) => {
            state.getLastUpdated.lastUpdated = action.payload.lastUpdated
            state.getLastUpdated.loading = false
        },
        getLastUpdatedError: (state, action) => {
            state.getLastUpdated.error = action.payload
            state.getLastUpdated.loading = false
        },
    }),
})

export const {
    getLog,
    getLogSuccess,
    getLogError,
    getLastUpdated,
    getLastUpdatedSuccess,
    getLastUpdatedError
} = loggerSlice.actions

export default loggerSlice.reducer