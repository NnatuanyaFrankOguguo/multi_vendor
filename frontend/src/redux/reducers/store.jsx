import { createReducer } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    isLoading: true,
};


export const storeReducer = createReducer(initialState, (builder) => {
    // LoginRequest: (state) => {
    //     state.loading = true;
    // }
    builder
    .addCase('LoadStoreRequest', (state) => {
        state.isLoading = true;
    })
    .addCase('LoadStoreSuccess', (state, action) => {
        state.isStoreAuthenticated = true;
        state.isLoading = false;
        state.store = action.payload;
    })
    .addCase('LoadStoreFail', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isStoreAuthenticated = false;
    })
    .addCase('ClearErrors', (state) => {
        state.error = null;
    })
  
});