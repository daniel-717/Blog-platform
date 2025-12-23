import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/posts';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Flag to check ownership for showing edit/delete buttons
  const isAuthor = post && user && post.authorId === user._id;

  // Define headers with token
  const config = {
      headers: {
          Authorization: `Bearer ${user?.token}`,
      },
  };

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => {
        setPost(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios.delete(`${API_URL}/${id}`, config)
        .then(() => {
          toast.success('Post deleted successfully!');
          navigate('/'); 
        })
        .catch(error => console.error('Error deleting post:', error));
    }
  };

  if (loading) return <h2>Loading Post...</h2>;
  if (!post) return <h2>Post not found.</h2>;

  return (
    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#666', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        By **{post.author}** | Published on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
        {post.content}
      </div>

      <div style={{ marginTop: '30px' }}>
        {/* CONDITIONAL RENDERING for Edit/Delete buttons */}
        {isAuthor && (
            <>
                <Link to={`/edit/${post._id}`} className="btn-edit">
                Edit
                </Link>
                <button onClick={handleDelete} className="btn-danger">
                Delete
                </button>
            </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;