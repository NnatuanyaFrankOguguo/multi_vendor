import axios from 'axios';
import server from '../../server';

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'LoadUserRequest'
        });

        // Check if the token exists before making the request
        const {data} = await axios.get(`${server}/api/users/getuser`, {withCredentials: true});
        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user
        });
    } catch (error) {
        console.error("LoadUser Error:", error.response?.data?.message || error.message);
        dispatch({
            type: 'LoadUserFail',
            payload: error.response.data.message
        });
    }
}

// then we go back to the store.js to import what we just code here