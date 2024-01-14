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
            <label htmlFor="content" className="form-label">Leave a comment</label>
            <input
                type="text"
                className="form-control"
                id="content"
                name="content"
                placeholder="Leave a comment"
                value={content}
                onChange={handleContentChange}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Comment;
