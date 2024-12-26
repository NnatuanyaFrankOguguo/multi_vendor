import { createReducer } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
    isAuthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
    // LoginRequest: (state) => {
    //     state.loading = true;
    // }
    builder
    .addCase('LoadUserRequest', (state) => {
        state.loading = true;
    })
    .addCase('LoadUserSuccess', (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    })
    .addCase('LoadUserFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })
    .addCase('ClearErrors', (state) => {
        state.error = null;
    })
  
});

// this is our reducer function now to go to the store.js to import it but before that we go to actions next