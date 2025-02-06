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
        //console.error("LoadUser Error:", error.response?.data?.message || error.message); // Log the error
        dispatch({
            type: 'LoadUserFail',
            payload: error.response?.data?.message  || "Something went wrong"  // Handle errors
        });
    }
}

