import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getMasterGizi: {
        data: null,
        loading: false,
        error: null
    },
    getDaftarPasienRawatInap: {
        data: null,
        loading: false,
        error: null
    },
}

const SliceNameSlice = createSlice({
    name: "SliceName",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getMasterGizi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getMasterGizi.data = null
                state.getMasterGizi.loading = true
            }
        ),
        getMasterGiziSuccess: (state, action) => {
            state.getMasterGizi.data = action.payload
            state.getMasterGizi.loading = false
        },
        getMasterGiziError: (state, action) => {
            state.getMasterGizi.error = action.payload
            state.getMasterGizi.loading = false
        },

        getDaftarPasienRawatInap: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDaftarPasienRawatInap.data = null
                state.getDaftarPasienRawatInap.loading = true
            }
        ),
        getDaftarPasienRawatInapSuccess: (state, action) => {
            state.getDaftarPasienRawatInap.data = action.payload
            state.getDaftarPasienRawatInap.loading = false
        },
        getDaftarPasienRawatInapError: (state, action) => {
            state.getDaftarPasienRawatInap.error = action.payload
            state.getDaftarPasienRawatInap.loading = false
        },
    }),
})

export const {
    getMasterGizi,getMasterGiziError,getMasterGiziSuccess,
    getDaftarPasienRawatInap,getDaftarPasienRawatInapError,getDaftarPasienRawatInapSuccess
} = SliceNameSlice.actions

export default SliceNameSlice.reducer