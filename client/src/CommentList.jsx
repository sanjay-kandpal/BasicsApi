import  { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/posts/${postId}/comments`);
      setComments(response.data);
    } catch (err) {
      setError('Failed to fetch comments. Please try again later.');
      console.error('Error fetching comments:', err);
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p className="error">{error}</p>;
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <ul className="comment-list">
      {comments.map(comment => (
        <li key={comment.id} className="comment-item">{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;