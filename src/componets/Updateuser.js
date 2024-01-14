import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Updateuser = () => {
    const [credentials, setCredentials] = useState({ name: "" })
    let history = useNavigate();
    const [images, setImages] = useState('');
    const [updateType, setUpdateType] = useState('name');
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });
    const notifyFalse = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"

    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name } = credentials;

        const formData = new FormData();

        formData.append('name', name);


        // Append each file to the FormData
        for (const image of images) {
            formData.append('images', image);

        }


        const response = await fetch("https://hopestone.onrender.com/v1/user/update/", {
            method: 'PATCH',
            headers: {

                "Authorization": localStorage.getItem('token')


            },

            body: formData
        });
        const json = await response.json()







        if (json.success) {
            notify(json.msg);
            history('/Myaccount')
        }
        else {
            // alert issue
            notifyFalse(json.msg);
            history('/Myaccount')
        }




    }

    const onChange = (e) => {
        const { name, value, type, files } = e.target;


        if (type === 'file') {

            setImages([...files]); // Update images with the selected files
        } else {
            // Handle non-file inputs
            setCredentials({ ...credentials, [name]: value });
        }
    }
    return (
        <div>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                < div className="mb-3">

                    <label htmlFor="updateType" className="form-label">
                        Select Update Type
                    </label>
                    <select
                        id="updateType"
                        name="updateType"
                        className="form-select"
                        onChange={(e) => setUpdateType(e.target.value)}
                        value={updateType}
                    >
                        <option value="name">Update Name</option>
                        <option value="image">Update Image</option>

                    </select>


                </div>


                {updateType === 'name' && (

                    <div className="mb-3">

                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />

                    </div>)}

                {updateType === 'image' && (
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">image</label>
                        <input type="file" className="form-control" id="image" name='image' onChange={onChange} />
                    </div>)}


                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
export default Updateuser
