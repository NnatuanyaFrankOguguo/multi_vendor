import { createReducer } from '@reduxjs/toolkit'

//Define the initial state
const initialState = {
    isLoading: true,
}

// we need to display the store products in multiples pages
//so in order to prevent the same products to be fetched multiple times(to prevent the database, site from being slow), we'll use a redux to keep track of the products we've already fetched 

export const productReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('ProductCreateRequest', (state) => {
            state.isLoading = true;
            // we set isLoading to true when a new product request is made
        })
        .addCase('ProductCreateSuccess', (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            // when the product request is successful, we load the products into the state and set isLoading to false
            state.success = true;
        })
        .addCase('ProductCreateFail', (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            // when the product request fails, we set the error in the state and set isLoading to false
            state.success = false;
        })
        .addCase('ClearErrors', (state) => {
            state.error = null;
            state.success = false;
            // when we clear the errors, we reset the state
            state.isLoading = false;
        })
})

// then we go to the product actions 
// and in the product actions we dispatch the actions with the products data and handle the success and failure cases as shown above
//then we go to the store.js file and import this reducer and add it to the root reducer.