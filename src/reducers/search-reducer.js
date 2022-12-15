import {createSlice} from "@reduxjs/toolkit";
import {getPageThunk, searchWikiThunk} from "../search/search-thunk"
const searchReducer = createSlice({
    name: 'search',
    initialState: {
        results: [],
        details: {},
        loading: false,
        detailsLoading: false
    },
    extraReducers: {
        [getPageThunk.pending]: (state, {payload}) => {
                state.detailsLoading = true
            }, 
        [getPageThunk.fulfilled]: (state, {payload}) => {
                state.detailsLoading = false
                state.details = payload
            }, 
        [searchWikiThunk.pending]: (state, {payload}) => {
                state.loading = true
            },
        [searchWikiThunk.fulfilled]: (state, {payload}) => {
                console.log(payload)
                state.loading = false
                state.results = payload.pages
            },
    },
})

export default searchReducer.reducer
