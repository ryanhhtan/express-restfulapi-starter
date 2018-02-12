import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import apiRouter from './routes/api';
import config from '../config/config';

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
mongoose.connect('mongodb://' + dbuser + ':' + dbpassword + '@ds231568.mlab.com:31568/ryanhhtan-posting');
// Get mongoose to use the global promise library.
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
// Bind connection to error event to get notification
db.on('error', console.error.bind(console, 'connection error.'));

/* Root route */
server.get('/', (req, res) => {
  res.send('Sever is running.<br> Use /api enpoint to access data.');
});

/* Use api endpoint to handle restful requests */
server.use('/api', apiRouter);


/* Start the server */
server.listen(port, () => {
  console.log('Server is running on port ' + port);
});

