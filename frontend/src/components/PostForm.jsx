import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import AuthContext from '../context/AuthContext';

const API_URL = 'http://localhost:5000/api/posts';

const PostForm = ({ isEdit = false }) => {
  const [post, setPost] = useState({ title: '', content: ''});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
        navigate('/login');
    }
  }, [user, navigate]);

  const config = {
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
      },
  };

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          setPost(response.data); 
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEdit) {
      axios.put(`${API_URL}/${id}`, post, config)
        .then(() => {
          toast.success('Post updated successfully!');
          navigate(`/post/${id}`);
        })
        .catch(error => console.error('Error updating post:', error));
    } else {
      axios.post(API_URL, post, config)
        .then(() => {
          toast.success('Post created successfully!');
          navigate('/'); 
        })
        .catch(error => console.error('Error creating post:', error));
    }
  };

  if (isEdit && loading) return <div>Loading Post Data...</div>;

  return (
    <div className="post-form" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>{isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        
        <label htmlFor="title" style={{ marginTop: '15px', fontWeight: 'bold' }}>Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label htmlFor="content" style={{ marginTop: '15px', fontWeight: 'bold' }}>Content:</label>
        <textarea
          id="content"
          name="content"
          rows="10"
          value={post.content}
          onChange={handleChange}
          required
          style={inputStyle}
        ></textarea>
        
        <label htmlFor="author" style={{ marginTop: '15px', fontWeight: 'bold' }}>Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
          {isEdit ? 'Save Changes' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '5px',
};

export default PostForm;