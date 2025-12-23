import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import PostForm from './components/PostForm';
import Login from './components/Login';         
import Register from './components/Register';   
import AuthContext from './context/AuthContext'; 
import { useContext } from 'react';              
import './index.css';
import { Toaster } from 'react-hot-toast';


const Header = () => {
  const { user, logout } = useContext(AuthContext); 
  
  const handleLogout = () => {
    logout();
  }

  return (
    <header style={{ 
      backgroundColor: 'var(--primary-color)', 
      color: 'white', 
      padding: '20px', 
      marginBottom: '20px'
    }}>
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5em' }}>
          MERN Blog
        </Link>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          
          {user ? (
            // Authenticated Links
            <>
              <span style={{ marginRight: '10px' }}>Hello, **{user.username}**!</span>
              <Link to="/create" className="btn-edit" style={{ textDecoration: 'none' }}>
                + Create Post
              </Link>
              <button onClick={handleLogout} className="btn-danger">
                Logout
              </button>
            </>
          ) : (
            // Public Links
            <>
              <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" className="btn-primary" style={{ textDecoration: 'none', backgroundColor: '#4CAF50' }}>
                Register
              </Link>
            </>
          )}

        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <Toaster position='top-center'/>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm isEdit={true} />} />
          
          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;