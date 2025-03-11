import axios from 'axios';
import server from '../../server'

export const createEvent = (newForm) => async (dispatch) => {
    
    try {
        
        dispatch({
            type: 'eventCreateRequest'
        })

        const config = {header: {"Content-Type":"multipart/form-data"}} //for sending request to the server not connected with redux

        const { data } = await axios.post(`${server}/api/v2/events/create-event`, newForm, config)
        // after request is successful, then in the CREATE_event_SUCCESS action from event REDUCER, we will send the data
        dispatch({
            type: 'eventCreateSuccess',
            payload: data.event //we are sending the event object from the server to the  reducer
        })
    } catch (error) {
        dispatch({
            type: 'eventCreateFail',
            payload: error.response?.data?.message || 'Error creating event' //if error occurs, then in the CREATE_PRODUCT_FAIL action from product REDUCER, we will send the error message
        })
    }
}