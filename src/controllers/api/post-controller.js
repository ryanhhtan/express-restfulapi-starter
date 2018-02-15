import Post from '../../models/post';

/* Create post */
exports.addPost = (req, res, next) => {

  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    create_at: Date.now(),
    update_at: Date.now(),
    author: req.user._id
  });
  
  newPost.save().then(()=>{
    return res.json(newPost);
  }).catch(err => {
    next(err);
  });
};


/* Read post collection */
exports.getAllPosts = (req, res, next) => {
  Post.find().populate('author', 'name full_name').exec().then(posts => {
    return res.json(posts);
  }).catch(err => {
    console.log(err);
    return next(err);
  });
};

/* Read a single post */
exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).populate('author', 'name').exec().then(post => {
    return res.json(post);
  }).catch(err => {
    console.log(err);
    return next(err);
  });
};

/* Update a post */
exports.updatePost = (req, res, next) => {
  let update = Object.assign({}, req.body);
  update.update_at = Date.now();

  // SHOULD DO VALIDATION BEFORE SAVING DATA TO DATABASE

  //console.log(req.user);
  Post.findByIdAndUpdate(req.params.id, update).exec().then(oldPost => {
    return res.json(oldPost);
  }).catch(err => {
    return next(err);
  }); 
};

/* Delete a post */
exports.deletePost = (req, res, next) => {
  //console.log(req.params.id);
  Post.findByIdAndRemove(req.params.id).exec().then(deletedPost => {
    return res.json(deletedPost);
  }).catch(err => {
    return next(err);
  }); 
};
