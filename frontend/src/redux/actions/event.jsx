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

export const getAllEvents = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'getAllEventStoreRequest'
        })

        const {data} = await axios.get(`${server}/api/v2/events/get-all-events-store/${id}`);
        // after request is successful, then in the GET_ALL_PRODUCTS_SUCCESS action from product REDUCER, we will send the data
        dispatch({
            type: 'getAllEventStoreSuccess',
            payload: data.events //we are sending the products array from the server to the  reducer
        })

    } catch (error) {
        
        dispatch({
            type: 'getAllEventStoreFail',
            payload: error.response?.data?.message || 'Error creating event' //if error occurs, then in the CREATE_PRODUCT_FAIL action from product REDUCER, we will send the error message
        });
    }
}

//delete product 

export const deleteEvent = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'eventDeleteRequest'
        })

        const { data } = await axios.delete(`${server}/api/v2/events/delete-event/${id}`, {withCredentials: true}); //withCredentials: true to send cookies to the server for authentication
        // after request is successful, then in the DELETE_PRODUCT_SUCCESS action from product REDUCER, we will send the data
        dispatch({
            type: 'eventDeleteSuccess',
            payload: data.message //we are sending the product object from the server to the  reducer
        })
    } catch (error) {
        dispatch({
            type: 'eventDeleteFail',
            payload: error.response?.data?.message || 'Error deleting event' //if error occurs, then in the DELETE_PRODUCT_FAIL action from product REDUCER, we will send the error message
        })
    }
}
