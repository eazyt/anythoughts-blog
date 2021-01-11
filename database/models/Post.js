const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  github: String,
  live: String,
  tag: String,
  category: String,
  backend: String,
  frontend: String,
  language: String,
  subtitle: String,
  content: String,
  imageUrl: String, 
  imageUrl_1: String, 
  imageUrl_2: String, 
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post

