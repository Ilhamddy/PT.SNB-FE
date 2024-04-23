import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getDetailJenisProdukBankDarah: {
        data: null,
        loading: false,
        error: null
    },
    postOrderPelayananBankDarah: {
        data: null,
        loading: false,
        error: null
    },
    getRiwayatOrderBankDarah:{
        data: null,
        loading: false,
        error: null
    }
}

const bankDarahSlice = createSlice({
    name: "bpjs",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getDetailJenisProdukBankDarah: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDetailJenisProdukBankDarah.data = null
                state.getDetailJenisProdukBankDarah.loading = true
            }
        ),
        getDetailJenisProdukBankDarahSuccess: (state, action) => {
            state.getDetailJenisProdukBankDarah.data = action.payload
            state.getDetailJenisProdukBankDarah.loading = false
        },
        getDetailJenisProdukBankDarahError: (state, action) => {
            state.getDetailJenisProdukBankDarah.error = action.payload
            state.getDetailJenisProdukBankDarah.loading = false
        },

        postOrderPelayananBankDarah: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.postOrderPelayananBankDarah.data = null
                state.postOrderPelayananBankDarah.loading = true
            }
        ),
        postOrderPelayananBankDarahSuccess: (state, action) => {
            state.postOrderPelayananBankDarah.data = action.payload
            state.postOrderPelayananBankDarah.loading = false
        },
        postOrderPelayananBankDarahError: (state, action) => {
            state.postOrderPelayananBankDarah.error = action.payload
            state.postOrderPelayananBankDarah.loading = false
        },

        getRiwayatOrderBankDarah: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getRiwayatOrderBankDarah.data = null
                state.getRiwayatOrderBankDarah.loading = true
            }
        ),
        getRiwayatOrderBankDarahSuccess: (state, action) => {
            state.getRiwayatOrderBankDarah.data = action.payload
            state.getRiwayatOrderBankDarah.loading = false
        },
        getRiwayatOrderBankDarahError: (state, action) => {
            state.getRiwayatOrderBankDarah.error = action.payload
            state.getRiwayatOrderBankDarah.loading = false
        },
    }),
})
export const {
    getDetailJenisProdukBankDarah,getDetailJenisProdukBankDarahSuccess,getDetailJenisProdukBankDarahError,
    postOrderPelayananBankDarah,postOrderPelayananBankDarahSuccess,postOrderPelayananBankDarahError,
    getRiwayatOrderBankDarah,getRiwayatOrderBankDarahSuccess,getRiwayatOrderBankDarahError
} = bankDarahSlice.actions

export default bankDarahSlice.reducer