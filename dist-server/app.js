'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _yamljs = _interopRequireDefault(require("yamljs"));

var _users = _interopRequireDefault(require("./routes/users"));

var _books = _interopRequireDefault(require("./routes/books"));

var _comments = _interopRequireDefault(require("./routes/comments"));

var swaggerDocument = _yamljs["default"].load('swagger.yaml');

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use('/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerDocument)); // view engine setup

app.set('views', _path["default"].join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use('/api/v1/users', _users["default"]);
app.use('/api/v1/books', _books["default"]);
app.use('/api/v1/comments', _comments["default"]); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next((0, _httpErrors["default"])(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;