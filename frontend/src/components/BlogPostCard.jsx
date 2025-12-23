import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
  const cardStyle = {
    padding: '20px',
    margin: '15px 0',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    borderLeft: '5px solid var(--primary-color)'
  };

  const truncateContent = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={cardStyle} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <h3>{post.title}</h3>
        <p style={{ color: '#666' }}>
          By **{post.author}** | Posted on {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <p>{truncateContent(post.content, 150)}</p>
        <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Read more &rarr;</span>
      </div>
    </Link>
  );
};

export default BlogPostCard;