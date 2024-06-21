


import { createSlice } from "@reduxjs/toolkit"

const initState = {
    upsertAbsenFotoLokasi: {
        data: null,
        loading: false,
        error: null
    }
}

const userpegawaiSlice = createSlice({
    name: "userpegawai",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        upsertAbsenFotoLokasi: create.preparedReducer(
            (dataForm, dataJson, callback) => {
                return {
                    payload: {
                        dataForm,
                        dataJson,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertAbsenFotoLokasi.data = null
                state.upsertAbsenFotoLokasi.loading = true
            }
        ),
        upsertAbsenFotoLokasiSuccess: (state, action) => {
            state.upsertAbsenFotoLokasi.data = action.payload
            state.upsertAbsenFotoLokasi.loading = false
        },
        upsertAbsenFotoLokasiError: (state, action) => {
            state.upsertAbsenFotoLokasi.error = action.payload
            state.upsertAbsenFotoLokasi.loading = false
        },
    }),
})

export const {
    resetAll,
    upsertAbsenFotoLokasi,
    upsertAbsenFotoLokasiSuccess,
    upsertAbsenFotoLokasiError
} = userpegawaiSlice.actions

export default userpegawaiSlice.reducer