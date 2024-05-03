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
    upsertOrderGizi: {
        data: null,
        loading: false,
        error: null
    },
    getDaftarOrderGizi: {
        data: null,
        loading: false,
        error: null
    }
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

        upsertOrderGizi: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertOrderGizi.data = null
                state.upsertOrderGizi.loading = true
            }
        ),
        upsertOrderGiziSuccess: (state, action) => {
            state.upsertOrderGizi.data = action.payload
            state.upsertOrderGizi.loading = false
        },
        upsertOrderGiziError: (state, action) => {
            state.upsertOrderGizi.error = action.payload
            state.upsertOrderGizi.loading = false
        },

        getDaftarOrderGizi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDaftarOrderGizi.data = null
                state.getDaftarOrderGizi.loading = true
            }
        ),
        getDaftarOrderGiziSuccess: (state, action) => {
            state.getDaftarOrderGizi.data = action.payload
            state.getDaftarOrderGizi.loading = false
        },
        getDaftarOrderGiziError: (state, action) => {
            state.getDaftarOrderGizi.error = action.payload
            state.getDaftarOrderGizi.loading = false
        },
    }),
})

export const {
    getMasterGizi,getMasterGiziError,getMasterGiziSuccess,
    getDaftarPasienRawatInap,getDaftarPasienRawatInapError,getDaftarPasienRawatInapSuccess,
    upsertOrderGizi,upsertOrderGiziError,upsertOrderGiziSuccess,
    getDaftarOrderGizi,getDaftarOrderGiziSuccess,getDaftarOrderGiziError
} = SliceNameSlice.actions

export default SliceNameSlice.reducer