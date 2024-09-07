const express = require("express");
const path = require("path");
const app = express();
const port = 8001;
const connectToMongoDB = require("./connect");
const cookieParser = require("cookie-parser");
const { restrictToLoginUserOnly, CheckAuth } = require("./middlewares/auth");

const URL = require("./models/url");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("views", path.resolve("./views"));
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const urlRoute = require("./routes/url");
app.set("view engine", "ejs");

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() => {
  console.log("MongooDb connected ");
});
app.use("/user", userRoute);

app.use("/url", restrictToLoginUserOnly, urlRoute);
app.use("/", CheckAuth, staticRoute);

app.listen(port, () => console.log(`Server started at ${port}`));
