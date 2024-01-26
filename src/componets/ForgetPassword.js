import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {


    const [credentials, setCredentials] = useState({ email: "" })
    let history = useNavigate();
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email } = credentials;


        const response = await fetch("https://hopestone.onrender.com/v1/user/resetUserPassword", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json()


        if (json.success) {
            history('/');

            notify(json.msg);

        }
        else {
            notify(json.msg)
            history('/forgetPassword');

        }



        //  console.log(json.authtoken);c\


        // Save the auth token and redirect



    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (

        <div className="design">
            <div className='form'>
                <h3 style={{ color: 'black' }}>Forget Password</h3>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />

                    </div>




                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword
