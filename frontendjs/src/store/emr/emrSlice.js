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
    getHistorySkriningIGDSuccess
} = emrSlice.actions

export default emrSlice.reducer