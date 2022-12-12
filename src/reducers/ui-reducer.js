import { createSlice } from "@reduxjs/toolkit";
import { getRandomThunk, getOnThisDayThunk, getFromSearchThunk } from "../services/toTypeThunks"; 

const initialState = {
    alertVariant: "",
    alertMessage: "",
    dismissible: true,
    alertShown: false,
}

const uiReducer = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setAlert(state, {payload}) {
            state.alertVariant = payload.variant
            state.alertMessage = payload.message
            state.dismissible = payload.dismissible
            state.alertShown = true
        },
        dismissAlert(state, {payload}) {
            state.alertShown = false
        },
        showAlert(state, {payload}) {
            state.alertShown = true
        },
    },
});

export const {setAlert, dismissAlert, showAlert} = uiReducer.actions;
export default uiReducer.reducer;
