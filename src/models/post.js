import mongoose from 'mongoose';
import User from './user';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
  },
  author: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

