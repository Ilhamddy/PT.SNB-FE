import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getPesertaBPJS: {
        data: null,
        loading: false,
        error: null
    }
}

const bpjsSlice = createSlice({
    name: "bpjs",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getPesertaBPJS: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getPesertaBPJS.data = null
                state.getPesertaBPJS.loading = true
            }
        ),
        getPesertaBPJSSuccess: (state, action) => {
            state.getPesertaBPJS.data = action.payload
            state.getPesertaBPJS.loading = false
        },
        getPesertaBPJSError: (state, action) => {
            state.getPesertaBPJS.error = action.payload
            state.getPesertaBPJS.loading = false
        },
    }),
})

export const {
    getPesertaBPJS,
    getPesertaBPJSSuccess,
    getPesertaBPJSError
} = bpjsSlice.actions

export default bpjsSlice.reducer