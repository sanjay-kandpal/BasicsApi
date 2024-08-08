import  { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate.jsx";
import CommentList from "./CommentList.jsx";


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:4002/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  console.log(posts);
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map(post => (
        <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments}/>
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;