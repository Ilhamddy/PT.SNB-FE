import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getListNotifikasi: {
        data: null,
        loading: false,
        error: null
    },
    updateStatusBaca: {
        data: null,
        loading: false,
        error: null
    }
}

const notifikasiSlice = createSlice({
    name: "notifikasi",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },

        getListNotifikasi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getListNotifikasi.data = null
                state.getListNotifikasi.loading = true
            }
        ),
        getListNotifikasiSuccess: (state, action) => {
            state.getListNotifikasi.data = action.payload
            state.getListNotifikasi.loading = false
        },
        getListNotifikasiError: (state, action) => {
            state.getListNotifikasi.error = action.payload
            state.getListNotifikasi.loading = false
        },
        
        updateStatusBaca: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.updateStatusBaca.data = null
                state.updateStatusBaca.loading = true
            }
        ),
        updateStatusBacaSuccess: (state, action) => {
            state.updateStatusBaca.data = action.payload
            state.updateStatusBaca.loading = false
        },
        updateStatusBacaError: (state, action) => {
            state.updateStatusBaca.error = action.payload
            state.updateStatusBaca.loading = false
        },
    }),
})

export const {
    getListNotifikasi,getListNotifikasiError,getListNotifikasiSuccess,
    updateStatusBaca,updateStatusBacaSuccess,updateStatusBacaError
} = notifikasiSlice.actions

export default notifikasiSlice.reducer