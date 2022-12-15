import {createAsyncThunk} from "@reduxjs/toolkit";
import {createUser, findAllUsers, findUserByName, login, logout, profile, register, getReplays, saveReplay, deleteReplay} from "./user-service";

export const logoutThunk = createAsyncThunk(
    'logout',
    async () => await logout()
)

export const profileThunk = createAsyncThunk(
    'profile',
    async () => await profile()
)

export const findUserByNameThunk = createAsyncThunk(
    'findUserById',
    async (name) => await findUserByName(name)
)

export const loginThunk = createAsyncThunk(
    'login',
    async (user) => await login(user)
)

export const registerThunk = createAsyncThunk(
    'register',
    async (user) => await register(user)
)

export const findAllUsersThunk = createAsyncThunk(
    'findAllUsers',
    async () => await findAllUsers()
)

export const getReplaysThunk = createAsyncThunk(
    'getReplays',
    async (username = "") => await getReplays(username)
)

export const saveReplayThunk = createAsyncThunk(
    'saveReplay',
    async (replay) => await saveReplay(replay)
)

export const deleteReplayThunk = createAsyncThunk(
    'deleteReplay',
    async (replayId) => await deleteReplay(replayId)
)
