import axios from 'axios';
import server from '../../server'

export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({
            type: 'ProductCreateRequest'
        })

        const config = {header: {"Content-Type":"multipart/form-data"}} //for sending request to the server not connected with redux

        const { data } = await axios.post(`${server}/api/v2/products/create-product`, newForm, config)
        // after request is successful, then in the CREATE_PRODUCT_SUCCESS action from product REDUCER, we will send the data
        dispatch({
            type: 'ProductCreateSuccess',
            payload: data.product //we are sending the product object from the server to the  reducer
        })
    } catch (error) {
        dispatch({
            type: 'ProductCreateFail',
            payload: error.response?.data?.message || 'Error creating product' //if error occurs, then in the CREATE_PRODUCT_FAIL action from product REDUCER, we will send the error message
        })
    }
}

// in the product reducer, we will handle these actions
// and return the new state based on the action type
// actions > reducers > store.js