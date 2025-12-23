const express = require('express');
const BlogPost = require('../models/BlogModel');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => { 
  try {
    const { title, content } = req.body;
    
    const newPost = new BlogPost({ 
        title, 
        content, 
        authorId: req.user._id,
        author: req.user.username 
    });
    
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 }); 
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/:id', protect, async (req, res) => { 
  try {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
      // Check if the logged-in user is the author of the post
      if (post.authorId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to update this post' });
      }

      const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body, 
        { new: true, runValidators: true }
      );
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/:id', protect, async (req, res) => { 
  try {
    const post = await BlogPost.findById(req.params.id);

    if (post) {
      if (post.authorId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to delete this post' });
      }

      await BlogPost.findByIdAndDelete(req.params.id);
      res.json({ message: 'Blog post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;