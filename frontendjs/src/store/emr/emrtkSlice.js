import { createSlice } from "@reduxjs/toolkit"

const initState = {
    upsertAwalIGD: {
        data: null,
        loading: false,
        error: null
    }
}

const emrtkSlice = createSlice({
    name: "emrtk",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => initState,
        upsertAwalIGD: create.preparedReducer(
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
        upsertAwalIGDSuccess: (state, action) => {
            state.upsertAwalIGD.data = action.payload
            state.upsertAwalIGD.loading = false
        },
        upsertAwalIGDError: (state, action) => {
            state.upsertAwalIGD.data = action.payload
            state.upsertAwalIGD.loading = false
        },
    }),
    
})


export const {
    upsertAwalIGD, 
    upsertAwalIGDSuccess,
    upsertAwalIGDError
} = emrtkSlice.actions

export default emrtkSlice