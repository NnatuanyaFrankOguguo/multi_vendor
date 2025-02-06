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
        state.isLoading = false; // when the load store request is successful, after the seller logs in or sign in token gets added to the cookie
        //the loadstore() in store actions runs to get the user data saved it in the redux state THEN THIS (isLoading becomes false) meaning while its in the process isLoading becomes true
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