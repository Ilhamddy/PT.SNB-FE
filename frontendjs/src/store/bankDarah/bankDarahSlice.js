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
    },
    getWidgetDaftarOrderBankDarah:{
        data:null,
        loading:false,
        error:null
    },
    getDaftarOrderBankDarah:{
        data:null,
        loading:false,
        error:null
    },
    getListOrderByNorecOrder:{
        data:null,
        loading:false,
        error:null
    },
    postTglRencanaBankDarah: {
        data: null,
        loading: false,
        error: null
    },
    postVerifikasiOrderBankDarah: {
        data: null,
        loading: false,
        error: null
    },
    postDeleteDetailOrder: {
        data: null,
        loading: false,
        error: null
    },
    getDaftarPasienBankDarah:{
        data:null,
        loading:false,
        error:null
    },
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

        getWidgetDaftarOrderBankDarah:create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getWidgetDaftarOrderBankDarah.data = null
                state.getWidgetDaftarOrderBankDarah.loading = true
            }
        ),
        getWidgetDaftarOrderBankDarahSuccess: (state, action) => {
            state.getWidgetDaftarOrderBankDarah.data = action.payload
            state.getWidgetDaftarOrderBankDarah.loading = false
        },
        getWidgetDaftarOrderBankDarahError: (state, action) => {
            state.getWidgetDaftarOrderBankDarah.error = action.payload
            state.getWidgetDaftarOrderBankDarah.loading = false
        },

        getDaftarOrderBankDarah:create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDaftarOrderBankDarah.data = null
                state.getDaftarOrderBankDarah.loading = true
            }
        ),
        getDaftarOrderBankDarahSuccess: (state, action) => {
            state.getDaftarOrderBankDarah.data = action.payload
            state.getDaftarOrderBankDarah.loading = false
        },
        getDaftarOrderBankDarahError: (state, action) => {
            state.getDaftarOrderBankDarah.error = action.payload
            state.getDaftarOrderBankDarah.loading = false
        },

        getListOrderByNorecOrder:create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getListOrderByNorecOrder.data = null
                state.getListOrderByNorecOrder.loading = true
            }
        ),
        getListOrderByNorecOrderSuccess: (state, action) => {
            state.getListOrderByNorecOrder.data = action.payload
            state.getListOrderByNorecOrder.loading = false
        },
        getListOrderByNorecOrderError: (state, action) => {
            state.getListOrderByNorecOrder.error = action.payload
            state.getListOrderByNorecOrder.loading = false
        },

        postTglRencanaBankDarah: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.postTglRencanaBankDarah.data = null
                state.postTglRencanaBankDarah.loading = true
            }
        ),
        postTglRencanaBankDarahSuccess: (state, action) => {
            state.postTglRencanaBankDarah.data = action.payload
            state.postTglRencanaBankDarah.loading = false
        },
        postTglRencanaBankDarahError: (state, action) => {
            state.postTglRencanaBankDarah.error = action.payload
            state.postTglRencanaBankDarah.loading = false
        },

        postVerifikasiOrderBankDarah: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.postVerifikasiOrderBankDarah.data = null
                state.postVerifikasiOrderBankDarah.loading = true
            }
        ),
        postVerifikasiOrderBankDarahSuccess: (state, action) => {
            state.postVerifikasiOrderBankDarah.data = action.payload
            state.postVerifikasiOrderBankDarah.loading = false
        },
        postVerifikasiOrderBankDarahError: (state, action) => {
            state.postVerifikasiOrderBankDarah.error = action.payload
            state.postVerifikasiOrderBankDarah.loading = false
        },

        postDeleteDetailOrder: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.postDeleteDetailOrder.data = null
                state.postDeleteDetailOrder.loading = true
            }
        ),
        postDeleteDetailOrderSuccess: (state, action) => {
            state.postDeleteDetailOrder.data = action.payload
            state.postDeleteDetailOrder.loading = false
        },
        postDeleteDetailOrderError: (state, action) => {
            state.postDeleteDetailOrder.error = action.payload
            state.postDeleteDetailOrder.loading = false
        },

        getDaftarPasienBankDarah:create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getDaftarPasienBankDarah.data = null
                state.getDaftarPasienBankDarah.loading = true
            }
        ),
        getDaftarPasienBankDarahSuccess: (state, action) => {
            state.getDaftarPasienBankDarah.data = action.payload
            state.getDaftarPasienBankDarah.loading = false
        },
        getDaftarPasienBankDarahError: (state, action) => {
            state.getDaftarPasienBankDarah.error = action.payload
            state.getDaftarPasienBankDarah.loading = false
        },
    }),
})
export const {
    getDetailJenisProdukBankDarah,getDetailJenisProdukBankDarahSuccess,getDetailJenisProdukBankDarahError,
    postOrderPelayananBankDarah,postOrderPelayananBankDarahSuccess,postOrderPelayananBankDarahError,
    getRiwayatOrderBankDarah,getRiwayatOrderBankDarahSuccess,getRiwayatOrderBankDarahError,
    getWidgetDaftarOrderBankDarah,getWidgetDaftarOrderBankDarahSuccess,getWidgetDaftarOrderBankDarahError,
    getDaftarOrderBankDarah,getDaftarOrderBankDarahSuccess,getDaftarOrderBankDarahError,
    getListOrderByNorecOrder,getListOrderByNorecOrderSuccess,getListOrderByNorecOrderError,
    postTglRencanaBankDarah,postTglRencanaBankDarahSuccess,postTglRencanaBankDarahError,
    postVerifikasiOrderBankDarah,postVerifikasiOrderBankDarahSuccess,postVerifikasiOrderBankDarahError,
    postDeleteDetailOrder,postDeleteDetailOrderSuccess,postDeleteDetailOrderError,
    getDaftarPasienBankDarah,getDaftarPasienBankDarahSuccess,getDaftarPasienBankDarahError
} = bankDarahSlice.actions

export default bankDarahSlice.reducer