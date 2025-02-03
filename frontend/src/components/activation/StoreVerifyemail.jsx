import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import server from '../../server';

const StoreVerifyemail = () => {
    // Component to verify email after signup
    const navigate = useNavigate()
    const {activation_token} = useParams();
    const[error, setError] = useState();

    // TODO: implement email verification logic here
    useEffect(() => {
        // sending the activation token to the backend for the server to decode it collect the user information and store it in the database
        if(activation_token) {
            const activationEmail = async () => {
                try {
                    const response = await axios.post(`${server}/api/v2/stores/verify-email`, {activation_token})
                    console.log(response.data.message);
                    window.location.reload() // to reload the page after successful login
                    // navigate to the login page after successful verification
                    navigate('/login')
                    window.location.reload() // to reload the page after successful login
                    
                } catch (error) {
                    console.log(error.response.data.message);
                    setError(true);
                }
            }
            activationEmail();
        }
    }, [])

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
        }}> {/*be adding loader, error components, sweetalert components*/}
            {
                error? (<p>Your token is Expired</p>) : <div>Verifying email... Your account has been created Successfully</div>
            }
        </div>
    )
}

export default StoreVerifyemail