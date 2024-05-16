import { createSlice } from "@reduxjs/toolkit"
import daftarPasienAPI from "sharedjs/src/daftarPasien/daftarPasienAPI"

const initState = {
    getDaftarPasienRegistrasi: {
        data: {...daftarPasienAPI.rGetDaftarPasienRegistrasi},
        loading: false,
        error: null
    },
    getComboDaftarPasienRegistrasi: {
        data: {...daftarPasienAPI.rGetComboDaftarPasienRegistrasi},
        loading: false,
        error: null
    }
}

const daftarPasienSlice = createSlice({
    name: "daftarPasien",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getDaftarPasienRegistrasi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDaftarPasienRegistrasi.data = {...initState.getComboDaftarPasienRegistrasi.data}
                state.getDaftarPasienRegistrasi.loading = true
            }
        ),
        getDaftarPasienRegistrasiSuccess: (state, action) => {
            state.getDaftarPasienRegistrasi.data = action.payload
            state.getDaftarPasienRegistrasi.loading = false
        },
        getDaftarPasienRegistrasiError: (state, action) => {
            state.getDaftarPasienRegistrasi.error = action.payload
            state.getDaftarPasienRegistrasi.loading = false
        },  

        getComboDaftarPasienRegistrasi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getComboDaftarPasienRegistrasi.data = {...initState.getComboDaftarPasienRegistrasi.data}
                state.getComboDaftarPasienRegistrasi.loading = true
            }
        ),
        getComboDaftarPasienRegistrasiSuccess: (state, action) => {
            state.getComboDaftarPasienRegistrasi.data = action.payload
            state.getComboDaftarPasienRegistrasi.loading = false
        },
        getComboDaftarPasienRegistrasiError: (state, action) => {
            state.getComboDaftarPasienRegistrasi.error = action.payload
            state.getComboDaftarPasienRegistrasi.loading = false
        },
    }),
})

export const {
    getDaftarPasienRegistrasi,
    getDaftarPasienRegistrasiSuccess,
    getDaftarPasienRegistrasiError,
    getComboDaftarPasienRegistrasi,
    getComboDaftarPasienRegistrasiSuccess,
    getComboDaftarPasienRegistrasiError
} = daftarPasienSlice.actions

export default daftarPasienSlice.reducer