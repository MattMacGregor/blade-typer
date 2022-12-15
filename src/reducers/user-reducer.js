import {createSlice} from "@reduxjs/toolkit";
import {findAllUsersThunk,
        findUserByNameThunk,
        loginThunk,
        logoutThunk,
        profileThunk,
        registerThunk,
        getReplaysThunk,
        saveReplayThunk,
        deleteReplayThunk,
} from "../login/users-thunk";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [],
        replays: {},
        loading: false,
        currentUser: null,
        publicProfile: null
    },
    extraReducers: {
        [getReplaysThunk.pending]: (state, {payload}) => {
                state.loading = true
            },
        [getReplaysThunk.fulfilled]: (state, {payload}) => {
                let newReplays = {}
                payload.forEach((replay) => {
                    if(!newReplays[replay.username]) {
                        newReplays[replay.username] = [replay]
                    } else {
                        newReplays[replay.username].push(replay)
                    }
                })
                state.replays = {...newReplays}
                state.loading = false
            },
        [saveReplayThunk.fulfilled]: (state, {payload}) => {
                state.replays[payload.username].push(payload)
            },
        [deleteReplayThunk.fulfilled]: (state, {payload}) => {
            state.replays[state.currentUser.username] = state.replays[state.currentUser.username].filter((replay) => replay._id != payload)
            },
        [findUserByNameThunk.pending]: (state, action) => {
            state.loading = true
        },
        [findUserByNameThunk.fulfilled]: (state, action) => {
                state.publicProfile = action.payload
                state.loading = false
            },
        [logoutThunk.fulfilled]: (state, action) => {
                state.currentUser = null
            },
        [profileThunk.fulfilled]: (state, action) => {
                state.currentUser = action.payload
            },
        [registerThunk.fulfilled]: (state, action) => {
                state.currentUser = action.payload
            },
        [loginThunk.fulfilled]: (state, action) => {
                state.currentUser = action.payload
            },
        [findAllUsersThunk.pending]: (state, action) => {
                state.loading = true
            },
        [findAllUsersThunk.fulfilled]: (state, action) => {
                state.users = action.payload
                state.loading = false
            },
    }
})

export default usersReducer.reducer

