import {configureStore} from '@reduxjs/toolkit';
import {userReducer} from './reducers/user';

const Store = configureStore({
    reducer: {
        user: userReducer
    }
});

export default Store;

//go to main.jsx to import the redux in our frontend and also Store too