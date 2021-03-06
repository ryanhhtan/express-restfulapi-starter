import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from '../config/config';

import apiRouter from './routes/api';
import authRouter from './routes/auth';

/* Get express instance and set listening port */
const server = express();

/* Set service port according to configure */
const port = config.port;

/* Middleware */
server.use(bodyParser.json());

/* Get db connection credentials either from environment variables or from a file */
const dbuser = config.dbCredentials.dbuser;
const dbpassword = config.dbCredentials.dbpassword;

/* Set up default mongoose connection */
mongoose.connect(`mongodb+srv://${dbuser}:${dbpassword}@cluster0-dlpyf.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
// Get mongoose to use the global promise library.
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event to get notification
db.on('error', console.error.bind(console, 'connection error.'));


/* Root route */
server.get('/', (_, res) => {
  res.send('Sever is running.<br> Use /api enpoint to access data.');
});

/* Authentication enpoint */
server.use('/auth', authRouter);

/* API endpoint */
server.use('/api', apiRouter);

/* Start the server */
server.listen(port, () => {
  console.log('Server is running on port ' + port);
});

