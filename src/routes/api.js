import express from 'express';
import ApiPostController from '../controllers/api/post-controller';
import {authGuard} from '../controllers/auth/auth-controller';

const apiRouter = express.Router();

/* CRUD-C post */
//apiRouter.post('/posts', passport.authenticate('jwt', {session: false }), ApiPostController.addPost);
apiRouter.post('/posts', authGuard, ApiPostController.addPost);

/* CRUD-R post collection */
apiRouter.get('/posts', ApiPostController.getAllPosts);
/* CRUD-R post */
apiRouter.get('/post/:id', ApiPostController.getPost);
/* CRUD-U post */
apiRouter.put('/post/:id', authGuard, ApiPostController.updatePost);
/* CRUD-D post */
apiRouter.delete('/post/:id', authGuard, ApiPostController.deletePost);

module.exports = apiRouter;

