import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE
const USER_API = `${API_BASE}/users`
const REPLAY_API = `${API_BASE}/replays`

const api = axios.create({withCredentials: true});

export const findUserByName = async (name) => {
    const response = await api.get(`${USER_API}/${name}`)
    const user = response.data
    return user
}

export const register = async (user) => {
    const response = await api.post(`${API_BASE}/register`, user)
    const newUser = response.data
    return newUser
}

export const login = async (user) => {
    const response = await api.post(`${API_BASE}/login`, user)
    return response.data
}

export const logout = async () => {
    const response = await api.post(`${API_BASE}/logout`)
    return response.data
}

export const profile = async () => {
    const response = await api.post(`${API_BASE}/profile`)
    return response.data
}

export const findAllUsers = async () => {
    const response = await axios.get(USER_API)
    return response.data
}

export const getReplays = async(username) => {
    const response = await api.get(`${REPLAY_API}/${username}`)
    return response.data
}

export const saveReplay = async(replay) => {
    const response = await api.post(`${REPLAY_API}/save`, replay)
    return response.data
}

export const deleteReplay = async(replayId) => {
    const response = await api.delete(`${REPLAY_API}/single/${replayId}`)
    return response.data
}

export const updateUser = async (updates) => {
    console.log(updates.username, updates.updates)
    const response = await api.put(`${USER_API}/${updates.username}`, { username: updates.username, update: updates.updates })
    return response.data
}

const deleteUser = () => {}

