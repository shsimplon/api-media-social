const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch(() => console.error("Unable to connect to DB"));

mongoose.connection.on("connected", () => {});
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get("/", (req, res) => {
//   res.send("welcome");
// });
// app.get("/users", (req, res) => {
//   res.send("welcome to users");
// });
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
