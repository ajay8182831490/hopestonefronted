// userContext.js

import React, { createContext, useContext } from 'react';



const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};

export const UserContextProvider = ({ children }) => {


    const host = "https://hopestone.onrender.com"




    // add a note

    const getUser = async () => {
        try {
            const response = await fetch(`${host}/v1/user/post`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const json = await response.json();

            return json;
        } catch (ex) {
            throw new Error(ex);
        }
    };

    const deletePost = async (postId) => {




        try {


            const response = await fetch(`${host}/v1/user/post/deletePost/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`


                },

            });
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const json = await response.json();






            return json
        } catch (ex) {
            throw new Error(ex)
        }


    };

    const readPost = async (postId) => {

        try {


            const response = await fetch(`${host}/v1/post/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`


                },

            });
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const json = await response.json();




            return json

        } catch (ex) {
            throw new Error(ex)
        }


    }
    const allPost = async () => {

        try {


            const response = await fetch(`${host}/v1/post/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",



                },

            });
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }

            const json = await response.json();




            return json

        } catch (ex) {
            throw new Error(ex)
        }


    }
    const createComment = async (postId, content) => {


        try {
            const response = await fetch(`${host}/v1/post/createComment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Include the token in the headers
                },
                body: JSON.stringify({ content }),
            })
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            const json = await response.json();





            return json

        } catch (ex) {
            throw new Error(ex)
        }

    }
    const deleteComment = async (commentId) => {


        try {
            const response = await fetch(`${host}/v1/post/deleteComment/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Include the token in the headers
                },

            })
            if (!response.ok) {
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            const json = await response.json();





            return json

        } catch (ex) {
            throw new Error(ex)
        }

    }





    return (
        <UserContext.Provider value={{ getUser, deletePost, readPost, allPost, createComment, deleteComment }}>
            {children}
        </UserContext.Provider>
    );
};
