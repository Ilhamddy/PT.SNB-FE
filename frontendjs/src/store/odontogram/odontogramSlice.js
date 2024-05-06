import { createSlice } from "@reduxjs/toolkit"
import gigiAPI from "sharedjs/api/gigiAPI";

const initState = {
    getAllGigi: {
        data: {
            ...gigiAPI.rGetAllGigi
        },
        loading: false,
        error: null
    },
    getAllLegendGigi: {
        data: {
            ...gigiAPI.rGetAllLegendGigi
        },
        loading: false,
        error: null
    }
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
                state.getAllGigi.data = {
                    ...gigiAPI.rGetAllGigi
                }
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
                state.getAllLegendGigi.data = {
                    ...gigiAPI.rGetAllLegendGigi
                }
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
    }),
})

export const {
    getAllGigi,
    getAllGigiSuccess,
    getAllGigiError,
    getAllLegendGigi,
    getAllLegendGigiSuccess,
    getAllLegendGigiError
} = odontogramSlice.actions

export default odontogramSlice.reducer