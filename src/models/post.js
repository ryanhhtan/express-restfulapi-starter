import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  create_at: {
    type: Date, 
  },
  update_at: {
    type: Date, 
    default: Date.now 
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

