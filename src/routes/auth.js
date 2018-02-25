import express from 'express';
import AuthController from '../controllers/auth/auth-controller';

const authRouter = express.Router();

// Allow CORS
authRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  next();
});

authRouter.post('/register', AuthController.checkUserRules, AuthController.register);
authRouter.post('/login', AuthController.login);

module.exports = authRouter;
