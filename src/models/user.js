import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  activated: {
    type: Boolean,
    default: true,
    select: false
  }
});

UserSchema.virtual('full_name').get(function() { // Can not use arrow function here
  if (this.name.first !=="" || this.name.last != "") {
    return this.name.first + ' ' + this.name.last;
  }
  return "anonymous";
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

const User = module.exports = mongoose.model('User', UserSchema);

