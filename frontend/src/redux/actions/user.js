import axios from 'axios';
import server from '../../server';

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest'
        });

        const {data} = await axios.get(`${server}/api/users/getuser`, {withCredentials: true});
        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user
        });
    } catch (error) {
        console.error("LoadUser Error:", error.response?.data?.message || error.message); // Log the error
        dispatch({
            type: 'LoadUserFail',
            payload: error.response?.data?.message  || "Something went wrong"  // Handle errors
        });
    }
}

export const loadStore = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadStoreRequest'
        });

        const {data} = await axios.get(`${server}/api/v2/stores/getseller`, {withCredentials: true});
        dispatch({
            type: 'LoadStoreSuccess',
            payload: data.store
        });
    } catch (error) {
        console.error("LoadStore Error:", error.response?.data?.message || error.message); // Log the error
        dispatch({
            type: 'LoadStoreFail',
            payload: error.response?.data?.message  || "Something went wrong"  // Handle errors
        });
    }
}//next when doing the store redux we will go next to store reducers as we came to action first

// then we go back to the store.js to import what we just code here