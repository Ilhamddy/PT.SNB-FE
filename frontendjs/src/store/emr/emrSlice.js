import { createSlice } from "@reduxjs/toolkit"

const initState = {
    upsertAwalIGD: {
        data: null,
        loading: false,
        error: null
    },
    getAsesmenAwalIGD: {
        data: null,
        loading: false,
        error: null
    }
}

const emrSlice = createSlice({
    name: "emr",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },

        upsertAsesmenAwalIGD: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertAwalIGD.data = null
                state.upsertAwalIGD.loading = true
            }
        ),
        upsertAsesmenAwalIGDSuccess: (state, action) => {
            state.upsertAwalIGD.data = action.payload
            state.upsertAwalIGD.loading = false
        },
        upsertAsesmenAwalIGDError: (state, action) => {
            state.upsertAwalIGD.error = action.payload
            state.upsertAwalIGD.loading = false
        },

        getAsesmenAwalIGD: create.preparedReducer(
            (queries, callback) => {
                return {
                    payload: {
                        queries,
                        callback
                    }
                }
            },
            (state, action) => {
                state.getAsesmenAwalIGD.data = null
                state.getAsesmenAwalIGD.loading = true
            }
        ),
        getAsesmenAwalIGDSuccess: (state, action) => {
            state.getAsesmenAwalIGD.data = action.payload
            state.getAsesmenAwalIGD.loading = false
        },
        getAsesmenAwalIGDError: (state, action) => {
            state.getAsesmenAwalIGD.error = action.payload
            state.getAsesmenAwalIGD.loading = false
        },
    }),
    
})

export const {
    upsertAsesmenAwalIGD, 
    upsertAsesmenAwalIGDSuccess,
    upsertAsesmenAwalIGDError,
    getAsesmenAwalIGD,
    getAsesmenAwalIGDSuccess,
    getAsesmenAwalIGDError
} = emrSlice.actions

export default emrSlice.reducer