import { createSlice } from "@reduxjs/toolkit";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"; 

const initialState = {
    gamemode: "",
    toType: undefined,
    currentGoalIndex: 0,
    loading: false,
    totalKeyPresses: -1,
    wordsCorrect: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    typed: "",
    time: 0,
    startCountdown: 3,
    started: false,
    finished: false,
    typingId: ""

}

const toTypeSlice = createSlice({
    name: "toType",
    initialState,
    reducers: {
        nextGoal(state, {payload}) {
            state.currentGoalIndex += 1;
        },
        updateTyped(state, {payload}) {
            state.typed = payload
        },
        updateStats(state, {payload}) {
            const {total, correct, incorrect, correctWords} = payload
            state.totalKeyPresses = total
            state.wordsCorrect = correctWords
            state.totalCorrect = correct
            state.totalIncorrect = incorrect
        },
        incrementTime(state, {payload}) {
            state.time += 10
        },
        tickStartCountdownDown(state, {payload}) {
            if(payload) {
                state.startCountdown = payload
            } else {
                state.startCountdown -= 1
            }

            if(state.startCountdown == 0) {
                state.started = true
            }
        },
        reset(state, {payload}) {
            state.currentGoalIndex = initialState.currentGoalIndex;
            state.totalKeyPresSses = initialState.totalKeyPresses
            state.wordsCorrect = initialState.wordsCorrect
            state.totalCorrect = initialState.totalCorrect
            state.totalIncorrect = initialState.totalIncorrect
            state.typed = initialState.typed
            state.time = initialState.time
            state.startCountdown = initialState.startCountdown
            state.started = initialState.started
            state.finished = initialState.finished
        },
        finish(state, {payload}) {
            state.finished = true;
        },
        setGoal(state, {payload}) {
            state.currentGoalIndex = 0
            console.log(payload)
            state.toType = [payload.toType]
            state.loading = false
            state.typingId = payload.typingId
            state.gamemode = 'SEARCH'
        }
    },
    extraReducers: {
        [getRandomThunk.pending]: 
            (state) => {
                state.loading = true
                state.finished = false
                state.toType = ""
                state.gamemode = 'RANDOM'
            },
        [getRandomThunk.fulfilled]:
            (state, { payload }) => {
                console.log(`Payload ${payload}`)
                state.toType = payload.goals;
                state.currentGoalIndex = 0;
                state.loading = false;
                state.typingId = payload.typingId
            },
        [getRandomThunk.rejected]:
            (state) => {
                state.loading = false;
                state.toTypeTitle = "ERROR";
                state.toType = "Could not retrieve wikipedia article from server";
            },
        [getOnThisDayThunk.pending]: 
            (state) => {
                state.loading = true;
                state.toType = "";
                state.gamemode = 'DAY'
            },
        [getOnThisDayThunk.fulfilled]:
            (state, { payload }) => {
                console.log(`Payload ${payload}`)
                state.toType = payload.goals;
                state.currentGoalIndex = 0;
                state.loading = false;
                state.typingId = payload.typingId
            },
        [getOnThisDayThunk.rejected]:
            (state) => {
                state.loading = false;
                state.toTypeTitle = "ERROR";
                state.toType = "Could not retrieve wikipedia article from server";
            },
        [getFromSearchThunk.pending]: 
            (state) => {
                state.loading = true;
                state.toType = "";
            },
        [getFromSearchThunk.fulfilled]:
            (state, { payload }) => {
                console.log(`Payload ${payload}`)
                state.toType = payload.goals;
                state.currentGoalIndex = 0;
                state.loading = false;
                state.typingId = payload.typingId
            },
        [getFromSearchThunk.rejected]:
            (state) => {
                state.loading = false;
                state.toTypeTitle = "ERROR";
                state.toType = "Could not retrieve wikipedia article from server";
            },
    },
});

export const {nextGoal ,updateTyped, updateStats, incrementTime, tickStartCountdownDown, reset, finish, setGoal} = toTypeSlice.actions;
export default toTypeSlice.reducer;
