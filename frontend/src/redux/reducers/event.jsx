import { createReducer } from '@reduxjs/toolkit'

//Define the initial state
const initialState = {
    isLoading: true,
}

// we need to display the store events in multiples pages
//so in order to prevent the same events to be fetched multiple times(to prevent the database, site from being slow), we'll use a redux to keep track of the events we've already fetched 

export const eventReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('eventCreateRequest', (state) => {
            state.isLoading = true;
            // we set isLoading to true when a new event request is made
        })
        .addCase('eventCreateSuccess', (state, action) => {
            state.event = action.payload;
            state.isLoading = false;
            // when the event request is successful, we load the events into the state and set isLoading to false
            state.success = true;
        })
        .addCase('eventCreateFail', (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            // when the event request fails, we set the error in the state and set isLoading to false
            state.success = false;
        })
        .addCase('ReseteventCreate', (state) => {
            state.success = false;
            state.error = null;
          })
        
        // GET ALL eventS OF A STORE
        .addCase('getAlleventStoreRequest', (state) => {
            state.isLoading = true;
            // we set isLoading to true when we request all events of a store
        })
        .addCase('getAlleventStoreSuccess', (state, action) => {
            state.events = action.payload;
            state.isLoading = false;
            // when the request is successful, we load the events into the state and set isLoading to false
            state.success = true;
        })
        .addCase('getAlleventStoreFail', (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            // when the request fails, we set the error in the state and set isLoading to false
            state.success = false;
        })
        

        // DELETE event OF A STORE
        .addCase('eventDeleteRequest', (state) => {
            state.isLoading = true;
            // we set isLoading to true when we request to delete a event
        })
        .addCase('eventDeleteSuccess', (state, action) => {
            state.isLoading = false;
            state.message = action.payload; // we set the message to display when the event is deleted
            // when the request is successful, we set isLoading to false
            state.success = true;
        })
        .addCase('eventDeleteFail', (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            // when the request fails, we set the error in the state and set isLoading to false
            state.success = false;
        })
        .addCase('ClearErrors', (state) => {
            state.error = null;
            state.success = false;
            // when we clear the errors, we reset the state
            state.isLoading = false;
        })

    
})

// then we go to the event actions 
// and in the event actions we dispatch the actions with the events data and handle the success and failure cases as shown above
//then we go to the store.js file and import this reducer and add it to the root reducer.