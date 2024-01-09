import { createSlice } from "@reduxjs/toolkit"

const initState = {
    upsertAwalIGD: {
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
            state.upsertAwalIGD.data = action.payload
            state.upsertAwalIGD.loading = false
        },
    }),
    
})

export const {
    upsertAsesmenAwalIGD, 
    upsertAsesmenAwalIGDSuccess,
    upsertAsesmenAwalIGDError
} = emrSlice.actions

export default emrSlice.reducer