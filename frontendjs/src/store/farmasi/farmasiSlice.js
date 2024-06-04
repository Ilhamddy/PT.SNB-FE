import { createSlice } from "@reduxjs/toolkit"

const initState = {
    panggil: {
        data: null,
        loading: false,
        error: null
    }
}

const farmasiSlice = createSlice({
    name: "farmasi",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        panggil: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.panggil.data = null
                state.panggil.loading = true
            }
        ),
        panggilSuccess: (state, action) => {
            state.panggil.data = action.payload
            state.panggil.loading = false
        },
        panggilError: (state, action) => {
            state.panggil.error = action.payload
            state.panggil.loading = false
        },
    }),
})

export const {
    panggil,
    panggilSuccess,
    panggilError
} = farmasiSlice.actions

export default farmasiSlice.reducer