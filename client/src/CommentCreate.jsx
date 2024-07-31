import axios from 'axios';
import { useState } from 'react';


const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    console.log(postId);
    const onSubmit = async (event) => {
        event.preventDefault();
        
        if (!content.trim()) {
            setError('Comment content cannot be empty.');
            return;
        }

        try {
            await axios.post(`http://localhost:8000/posts/${postId}/comments`, { content });
            setContent('');
            setError('');
        } catch (err) {
            setError('Failed to submit comment. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="commentContent">New Comment</label>
                    <input
                        id="commentContent"
                        className="form-control"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        aria-describedby="commentHelp"
                    />
                    {error && <small id="commentHelp" className="form-text text-danger">{error}</small>}
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    );
};


export default CommentCreate;
