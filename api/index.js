var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const createClient = require("redis").createClient;

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

var app = express();
app.use(cors());

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.get("/api/test", async (req, res) => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });
  client.on("error", err => console.log("Redis Client Error", err));
  await client.connect();

  await client.set("key", "world from redis");
  const value = await client.get("key");
  await client.disconnect();

  res.json({ hello: value });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT || "8888", () => {
  console.log(`Server running on port ${process.env.PORT || "8888"}`);
});

module.exports = app;
