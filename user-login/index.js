require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth/authRoutes");
const cookieParser = require("cookie-parser");
const databaseConfig = require("./config/databaseConfig");

databaseConfig();
const app = express();
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(cookieParser);

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error!");
  }
});

app.listen(process.env.PORT || 7000, () => {
  console.log(`Server is running on PORT: ${process.env.PORT || 7000}`);
});
