const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true,
  }, 
  authorId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', BlogSchema);