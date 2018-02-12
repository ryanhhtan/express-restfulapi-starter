import express from 'express';
import ApiPostController from '../controllers/api/post-controller';

const apiRouter = express.Router();

/* CRUD-C post */
apiRouter.post('/posts', ApiPostController.addPost);
/* CRUD-R post collection */
apiRouter.get('/posts', ApiPostController.getAllPosts);
/* CRUD-R post */
apiRouter.get('/post/:id', ApiPostController.getPost);
/* CRUD-U post */
apiRouter.put('/post', ApiPostController.updatePost);
/* CRUD-D post */
apiRouter.delete('/post/:id', ApiPostController.deletePost);

module.exports = apiRouter;

