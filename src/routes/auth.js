import express from 'express';
import AuthController from '../controllers/auth/auth-controller';

const authRouter = express.Router();

authRouter.post('/register', AuthController.checkUserRules, AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
