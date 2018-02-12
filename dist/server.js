/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = __webpack_require__(4);

var _api2 = _interopRequireDefault(_api);

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Get express instance and set listening port */
var server = (0, _express2.default)();

/* Set service port according to configure */
var port = _config2.default.port;

/* Middleware */
server.use(_bodyParser2.default.json());

/* Get db connection credentials either from environment variables or from a file */
var dbuser = _config2.default.dbCredentials.dbuser;
var dbpassword = _config2.default.dbCredentials.dbpassword;

/* Set up default mongoose connection */
_mongoose2.default.connect('mongodb://' + dbuser + ':' + dbpassword + '@ds231568.mlab.com:31568/ryanhhtan-posting');
// Get mongoose to use the global promise library.
_mongoose2.default.Promise = global.Promise;
// Get the default connection
var db = _mongoose2.default.connection;
// Bind connection to error event to get notification
db.on('error', console.error.bind(console, 'connection error.'));

/* Root route */
server.get('/', function (req, res) {
  res.send('Sever is running.<br> Use /api enpoint to access data.');
});

/* Use api endpoint to handle restful requests */
server.use('/api', _api2.default);

/* Start the server */
server.listen(port, function () {
  console.log('Server is running on port ' + port);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _postController = __webpack_require__(5);

var _postController2 = _interopRequireDefault(_postController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRouter = _express2.default.Router();

/* CRUD-C post */
apiRouter.post('/posts', _postController2.default.addPost);
/* CRUD-R post collection */
apiRouter.get('/posts', _postController2.default.getAllPosts);
/* CRUD-R post */
apiRouter.get('/post/:id', _postController2.default.getPost);
/* CRUD-U post */
apiRouter.put('/post', _postController2.default.updatePost);
/* CRUD-D post */
apiRouter.delete('/post/:id', _postController2.default.deletePost);

module.exports = apiRouter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _post = __webpack_require__(11);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Create post */
exports.addPost = function (req, res, next) {
  var newPost = new _post2.default({
    title: req.body.title,
    body: req.body.body,
    create_at: Date.now()
  });

  newPost.save().then(function () {
    return res.json(newPost);
  }).catch(function (err) {
    next(err);
  });
};

/* Read post collection */
exports.getAllPosts = function (req, res, next) {
  _post2.default.find().exec().then(function (posts) {
    return res.json(posts);
  }).catch(function (err) {
    return next(err);
  });
};

/* Read a single post */
exports.getPost = function (req, res, next) {
  _post2.default.findById(req.params.id).exec().then(function (post) {
    return res.json(post);
  }).catch(function (err) {
    return next(err);
  });
};

/* Update a post */
exports.updatePost = function (req, res, next) {
  var update = Object.assign({}, req.body);
  delete update['id'];

  // SHOULD DO VALIDATION BEFORE SAVING DATA TO DATABASE

  _post2.default.findByIdAndUpdate(req.body.id, update).exec().then(function (oldPost) {
    return res.json(oldPost);
  }).catch(function (err) {
    return next(err);
  });
};

/* Delete a post */
exports.deletePost = function (req, res, next) {
  //console.log(req.params.id);
  _post2.default.findByIdAndRemove(req.params.id).exec().then(function (deletedPost) {
    return res.json(deletedPost);
  }).catch(function (err) {
    return next(err);
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = process.env.NODE_ENV === 'production' ? __webpack_require__(8) : __webpack_require__(9);

/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var port = process.env.PORT || 80;

module.exports = {
  dbCredentials: {
    dbuser: process.env.DBUSER,
    dbpassword: process.env.DBPASSWORD
  },

  port: port
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var port = process.env.PORT || 3000;

module.exports = {
  dbCredentials: {
    dbuser: 'postingadmin',
    dbpassword: 'post1q2w3e'
  },

  port: port
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose2.default.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  create_at: {
    type: Date
  },
  update_at: {
    type: Date,
    default: Date.now
  }
});

var Post = module.exports = _mongoose2.default.model('Post', PostSchema);

/***/ })
/******/ ]);