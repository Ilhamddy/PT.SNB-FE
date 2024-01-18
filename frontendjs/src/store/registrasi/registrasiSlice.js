import { createSlice } from "@reduxjs/toolkit"

const initState = {
    updateNoRM: {
        data: null,
        loading: false,
        error: null
    },
    getNoRMLast: {
        data: null,
        msgAvailable: '',
        loading: false,
        error: null
    }
}

const registrasiSlice = createSlice({
    name: "registrasi",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },

        getNoRMLast: create.preparedReducer(
            (queries) => {
                return {
                    payload: {
                        queries
                    }
                }
            },
            (state, action) => {
                state.getNoRMLast.data = null
                state.getNoRMLast.loading = true
            }
        ),
        getNoRMLastSuccess: (state, action) => {
            state.getNoRMLast.data = action.payload
            state.getNoRMLast.msgAvailable = action.payload.msgAvailable
            state.getNoRMLast.loading = false
        },
        getNoRMLastError: (state, action) => {
            state.getNoRMLast.error = action.payload
            state.getNoRMLast.loading = false
        },

        updateNoRM: create.preparedReducer(
            (data, callback) => {
                return {
                    payload: {
                        data,
                        callback
                    }
                }
            },
            (state, action) => {
                state.updateNoRM.data = null
                state.updateNoRM.loading = true
            }
        ),
        updateNoRMSuccess: (state, action) => {
            state.updateNoRM.data = action.payload
            state.updateNoRM.loading = false
        },
        updateNoRMError: (state, action) => {
            state.updateNoRM.error = action.payload
            state.updateNoRM.loading = false
        },

        
    }),
})

export const {
    updateNoRM,
    updateNoRMSuccess,
    updateNoRMError,
    getNoRMLast,
    getNoRMLastSuccess,
    getNoRMLastError,
} = registrasiSlice.actions

export default registrasiSlice.reducer