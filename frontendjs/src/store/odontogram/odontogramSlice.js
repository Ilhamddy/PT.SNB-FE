import { createSlice } from "@reduxjs/toolkit"
import gigiAPI from "sharedjs/src/gigi/gigiAPI";

const initState = {
    getAllGigi: {
        data: gigiAPI.rGetAllGigi(),
        loading: false,
        error: null
    },
    getAllLegendGigi: {
        data: gigiAPI.rGetAllLegendGigi(),
        loading: false,
        error: null
    },
    upsertOdontogram: {
        data: {
            ...gigiAPI.rUpsertOdontogramDetail
        },
        loading: false,
        error: null
    },
    getOdontogram: {
        data: gigiAPI.rGetOdontogram(),
        loading: false,
        error: null
    },
    getComboOdontogram: {
        data: gigiAPI.rGetComboOdontogram(),
        loading: false,
        error: null
    },
}

const odontogramSlice = createSlice({
    name: "odontogram",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        getAllGigi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getAllGigi.data = gigiAPI.rGetAllGigi()
                state.getAllGigi.loading = true
            }
        ),
        getAllGigiSuccess: (state, action) => {
            state.getAllGigi.data = action.payload
            state.getAllGigi.loading = false
        },
        getAllGigiError: (state, action) => {
            state.getAllGigi.error = action.payload
            state.getAllGigi.loading = false
        },

        getAllLegendGigi: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getAllLegendGigi.data = gigiAPI.rGetAllLegendGigi()
                state.getAllLegendGigi.loading = true
            }
        ),
        getAllLegendGigiSuccess: (state, action) => {
            state.getAllLegendGigi.data = action.payload
            state.getAllLegendGigi.loading = false
        },
        getAllLegendGigiError: (state, action) => {
            state.getAllLegendGigi.error = action.payload
            state.getAllLegendGigi.loading = false
        },

        upsertOdontogram: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.upsertOdontogram.data = { ...initState.upsertOdontogram.data }
                state.upsertOdontogram.loading = true
            }
        ),
        upsertOdontogramSuccess: (state, action) => {
            state.upsertOdontogram.data = action.payload
            state.upsertOdontogram.loading = false
        },
        upsertOdontogramError: (state, action) => {
            state.upsertOdontogram.error = action.payload
            state.upsertOdontogram.loading = false
        },

        getOdontogram: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getOdontogram.data = { ...initState.getOdontogram.data }
                state.getOdontogram.loading = true
            }
        ),
        getOdontogramSuccess: (state, action) => {
            state.getOdontogram.data = action.payload
            state.getOdontogram.loading = false
        },
        getOdontogramError: (state, action) => {
            state.getOdontogram.error = action.payload
            state.getOdontogram.loading = false
        },

        getComboOdontogram: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getComboOdontogram.data = {...initState.getComboOdontogram.data}
                state.getComboOdontogram.loading = true
            }
        ),
        getComboOdontogramSuccess: (state, action) => {
            state.getComboOdontogram.data = action.payload
            state.getComboOdontogram.loading = false
        },
        getComboOdontogramError: (state, action) => {
            state.getComboOdontogram.error = action.payload
            state.getComboOdontogram.loading = false
        },
    }),
})

export const {
    getAllGigi,
    getAllGigiSuccess,
    getAllGigiError,
    getAllLegendGigi,
    getAllLegendGigiSuccess,
    getAllLegendGigiError,
    upsertOdontogram,
    upsertOdontogramSuccess,
    upsertOdontogramError,
    getOdontogram,
    getOdontogramSuccess,
    getOdontogramError,
    getComboOdontogram,
    getComboOdontogramSuccess,
    getComboOdontogramError
} = odontogramSlice.actions

export default odontogramSlice.reducer