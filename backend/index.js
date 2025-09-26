require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseConfig = require("./config/databaseConfig");
const authRouts = require("./routes/authRoutes");
const todoRouts = require("./routes/todoRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

databaseConfig();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack Todo App",
      version: "1.0.0",
      description: "This is a Fullstack Todo App",
    },
    servers: [
      {
        url: "http://localhost:8000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecifications = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecifications));

app.use("/api/auth", authRouts);
app.use("/api/todo", todoRouts);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
