import React, { useState } from 'react';

const Comment = ({ onSubmit }) => {
    const [content, setContent] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);

    };

    const handleSubmit = () => {

        if (content.trim() !== '') {
            onSubmit(content);
            setContent('');
        }
    };

    return (
        <div className="mb-3">
            <div className="form">
                <h3 style={{ color: 'black', margin: '3px', textAlign: 'center' }}>Leave a comment</h3>
                <input
                    type="text"
                    className="form-control"
                    id="content"
                    name="content"
                    placeholder="Leave a comment"
                    value={content}
                    onChange={handleContentChange}
                /> <div className="button">
                    <button className="btn btn-primary my-3" onClick={handleSubmit}>Submit</button></div>
            </div>
        </div>
    );
};

export default Comment;
