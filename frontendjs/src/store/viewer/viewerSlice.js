import { createSlice } from "@reduxjs/toolkit"
import viewerAPI from "sharedjs/src/viewer/viewerAPI"

const initState = {
    getAntreanObat: {
        data: viewerAPI.rGetAntreanObat(),
        loading: false,
        error: null
    }
}

const viewerSlice = createSlice({
    name: "viewer",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },

        getAntreanObat: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.getAntreanObat.data = viewerAPI.rGetAntreanObat()
                state.getAntreanObat.loading = true
            }
        ),
        getAntreanObatSuccess: (state, action) => {
            state.getAntreanObat.data = action.payload
            state.getAntreanObat.loading = false
        },
        getAntreanObatError: (state, action) => {
            state.getAntreanObat.error = action.payload
            state.getAntreanObat.loading = false
        },
        
        

    }),
})

export const {
    getAntreanObat,
    getAntreanObatSuccess,
    getAntreanObatError
} = viewerSlice.actions

export default viewerSlice.reducer