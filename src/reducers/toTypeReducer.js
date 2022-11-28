import { createSlice } from "@reduxjs/toolkit";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"; 

const initialState = {
    toType: undefined,
    currentGoalIndex: 0,
    loading: false,
    totalKeyPresses: -1,
    wordsCorrect: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    typed: "",
    time: 0,
    startCountdown: 5,
    started: false,
    finished: false
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
        }
    },
    extraReducers: {
        [getRandomThunk.pending]: 
            (state) => {
                state.loading = true;
                state.toType = "";
            },
        [getRandomThunk.fulfilled]:
            (state, { payload }) => {
                console.log(`Payload ${payload}`)
                state.toType = payload.goals;
                state.currentGoalIndex = 0;
                state.loading = false;
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
            },
        [getOnThisDayThunk.fulfilled]:
            (state, { payload }) => {
                console.log(`Payload ${payload}`)
                state.toType = payload.goals;
                state.currentGoalIndex = 0;
                state.loading = false;
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
            },
        [getFromSearchThunk.rejected]:
            (state) => {
                state.loading = false;
                state.toTypeTitle = "ERROR";
                state.toType = "Could not retrieve wikipedia article from server";
            },
    },
});

export const {nextGoal ,updateTyped, updateStats, incrementTime, tickStartCountdownDown} = toTypeSlice.actions;
export default toTypeSlice.reducer;
