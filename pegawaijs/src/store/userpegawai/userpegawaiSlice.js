


import { createSlice } from "@reduxjs/toolkit"

const initState = {
    user: {
        data: null,

    }
}

const userpegawaiSlice = createSlice({
    name: "userpegawai",
    initialState: initState,
    reducers: (create) => ({
        resetAll: (state) => {
            return initState
        },
        
        
    }),
})

export const {
    resetAll
} = userpegawaiSlice.actions

export default userpegawaiSlice.reducer