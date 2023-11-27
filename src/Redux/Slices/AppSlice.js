import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
    name : 'info',
    initialState : {
        groupBy : 'status',
        orderBy : 'title',
        data : [],
        errorMsg : '',
        loading : false
    },
    reducers : {
        updateGroupBy : (state,action) => {
            state.groupBy = action.payload
        },
        updateOrderBy : (state,action) => {
            state.orderBy = action.payload
        },
        addData : (state,action) => {
            state.data = action.payload
        },
        addError : (state,action) => {
            state.errorMsg = action.payload
        },
        addLoading : (state, action) => {
            state.loading = action.payload
        }
    }
})
export const {updateGroupBy, updateOrderBy, addData, addError,addLoading}  = AppSlice.actions
export default AppSlice.reducer
