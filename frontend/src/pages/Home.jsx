import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPostCard from '../components/BlogPostCard';

const API_URL = 'http://localhost:5000/api/posts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(API_URL)
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  if (loading) return <h2>Loading Blog Posts...</h2>;
  if (posts.length === 0) return <h2>No posts found. Why don't you create one?</h2>;

  return (
    <div>
      <h1>All Blog Posts</h1>
      <div>
        {posts.map(post => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;