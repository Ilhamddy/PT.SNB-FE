import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getLog: {
        data: null,
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
    }),
})

export const {
    getLog,
    getLogSuccess,
    getLogError
} = loggerSlice.actions

export default loggerSlice.reducer