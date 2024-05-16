import { createSlice } from "@reduxjs/toolkit"
import registrasiAPI from "sharedjs/src/registrasi/registrasiAPI"

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
    },
    upsertSkriningIGD: {
        data: null,
        loading: false,
        error: null
    },
    getHistorySkriningIGD: {
        data: null,
        loading: false,
        error: null
    },
    upsertDuplikatOrder: {
        data: null,
        loading: false,
        error: null
    },
    validateIcare: {
        data: null,
        loading: false,
        error: null 
    },
    upsertAntreanPenunjang: {
        data: {...registrasiAPI.bUpsertPenunjangModal},
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

        upsertSkriningIGD: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertSkriningIGD.data = null
                state.upsertSkriningIGD.loading = true
            }
        ),
        upsertSkriningIGDSuccess: (state, action) => {
            state.upsertSkriningIGD.data = action.payload
            state.upsertSkriningIGD.loading = false
        },
        upsertSkriningIGDError: (state, action) => {
            state.upsertSkriningIGD.error = action.payload
            state.upsertSkriningIGD.loading = false
        },

        getHistorySkriningIGD: create.preparedReducer(
            (queries, callback) => {
                return {
                    payload: {
                        queries,
                        callback
                    }
                }
            },
            (state, action) => {
                state.getHistorySkriningIGD.data = null
                state.getHistorySkriningIGD.loading = true
            }
        ),
        getHistorySkriningIGDSuccess: (state, action) => {
            state.getHistorySkriningIGD.data = action.payload
            state.getHistorySkriningIGD.loading = false
        },
        getHistorySkriningIGDError: (state, action) => {
            state.getHistorySkriningIGD.error = action.payload
            state.getHistorySkriningIGD.loading = false
        },

        validateIcare: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.validateIcare.data = null
                state.validateIcare.loading = true
            }
        ),
        validateIcareSuccess: (state, action) => {
            state.validateIcare.data = action.payload
            state.validateIcare.loading = false
        },
        validateIcareError: (state, action) => {
            state.validateIcare.error = action.payload
            state.validateIcare.loading = false
        },
        
        upsertAntreanPenunjang: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertAntreanPenunjang.data = {...initState.upsertAntreanPenunjang.data}
                state.upsertAntreanPenunjang.loading = true
            }
        ),
        upsertAntreanPenunjangSuccess: (state, action) => {
            state.upsertAntreanPenunjang.data = action.payload
            state.upsertAntreanPenunjang.loading = false
        },
        upsertAntreanPenunjangError: (state, action) => {
            state.upsertAntreanPenunjang.error = action.payload
            state.upsertAntreanPenunjang.loading = false
        },
    }),
})

export const {
    upsertAsesmenAwalIGD, 
    upsertAsesmenAwalIGDSuccess,
    upsertAsesmenAwalIGDError,
    getAsesmenAwalIGD,
    getAsesmenAwalIGDSuccess,
    getAsesmenAwalIGDError,
    upsertSkriningIGD,
    upsertSkriningIGDSuccess,
    upsertSkriningIGDError,
    getHistorySkriningIGD,
    getHistorySkriningIGDError,
    getHistorySkriningIGDSuccess,
    validateIcare,validateIcareError,validateIcareSuccess,
    upsertAntreanPenunjang,
    upsertAntreanPenunjangSuccess,
    upsertAntreanPenunjangError
} = emrSlice.actions

export default emrSlice.reducer

