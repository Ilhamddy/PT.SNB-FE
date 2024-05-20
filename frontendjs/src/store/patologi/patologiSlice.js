import { createSlice } from "@reduxjs/toolkit"
import patologiAPI from "sharedjs/src/patologi/patologiAPI"

const initState = {
    getComboTindakanPatologi: {
        data: [],
        loading: false,
        error: null
    },
    getHistoriUnit: {
        data: [],
        loading: false,
        error: null
    },
    upsertOrderPelayananPatologi: {
        data: null,
        loading: false,
        error: null
    },
    getHistoriPatologi: {
        data: patologiAPI.rGetHistoriPatologi(),
        loading: false,
        error: null
    }
}

const patologiSlice = createSlice({
    name: "patologi",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getComboTindakanPatologi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getComboTindakanPatologi.data = [...initState.getComboTindakanPatologi.data]
                state.getComboTindakanPatologi.loading = true
            }
        ),
        getComboTindakanPatologiSuccess: (state, action) => {
            state.getComboTindakanPatologi.data = action.payload
            state.getComboTindakanPatologi.loading = false
        },
        getComboTindakanPatologiError: (state, action) => {
            state.getComboTindakanPatologi.error = action.payload
            state.getComboTindakanPatologi.loading = false
        },

        getHistoriUnit: create.preparedReducer(
            (norecdp) => {
                return {
                    payload: {
                        norecdp
                    }
                }
            },
            (state, action) => {
                state.getHistoriUnit.data = [...initState.getHistoriUnit.data]
                state.getHistoriUnit.loading = true
            }
        ),
        getHistoriUnitSuccess: (state, action) => {
            state.getHistoriUnit.data = action.payload
            state.getHistoriUnit.loading = false
        },
        getHistoriUnitError: (state, action) => {
            state.getHistoriUnit.error = action.payload
            state.getHistoriUnit.loading = false
        },

        upsertOrderPelayananPatologi: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertOrderPelayananPatologi.data = null
                state.upsertOrderPelayananPatologi.loading = true
            }
        ),
        upsertOrderPelayananPatologiSuccess: (state, action) => {
            state.upsertOrderPelayananPatologi.data = action.payload
            state.upsertOrderPelayananPatologi.loading = false
        },
        upsertOrderPelayananPatologiError: (state, action) => {
            state.upsertOrderPelayananPatologi.error = action.payload
            state.upsertOrderPelayananPatologi.loading = false
        },

        getHistoriPatologi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getHistoriPatologi.data = patologiAPI.rGetHistoriPatologi()
                state.getHistoriPatologi.loading = true
            }
        ),
        getHistoriPatologiSuccess: (state, action) => {
            state.getHistoriPatologi.data = action.payload
            state.getHistoriPatologi.loading = false
        },
        getHistoriPatologiError: (state, action) => {
            state.getHistoriPatologi.error = action.payload
            state.getHistoriPatologi.loading = false
        },
    }),
})

export const {
    getComboTindakanPatologi,
    getComboTindakanPatologiSuccess,
    getComboTindakanPatologiError,
    getHistoriUnit,
    getHistoriUnitSuccess,
    getHistoriUnitError,
    upsertOrderPelayananPatologi,
    upsertOrderPelayananPatologiSuccess,
    upsertOrderPelayananPatologiError,
    getHistoriPatologi,
    getHistoriPatologiSuccess,
    getHistoriPatologiError
} = patologiSlice.actions

export default patologiSlice.reducer