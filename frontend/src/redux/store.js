import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/user.js';
import { storeReducer } from './reducers/store.jsx';

const Store = configureStore({
    reducer: {
        user: userReducer,
        store: storeReducer
    }
});

export default Store;

//then go to the App.jsx to call our loadStore() action so that we on load if its the store/seller token it takes them to the to shop page
//go to main.jsx to import the redux in our frontend and also Store too