import { createSlice } from "@reduxjs/toolkit"

const initState = {
    getAllGigi: {
        data: null,
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
                state.getAllGigi.data = null
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
    }),
})

export const {
    getAllGigi,
    getAllGigiSuccess,
    getAllGigiError
} = odontogramSlice.actions

export default odontogramSlice.reducer