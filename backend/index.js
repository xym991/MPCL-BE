const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8080;
require("dotenv").config();

app.use(express.json({ limit: "50mb" }));

// Allow all origins
app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://mpcl-fe.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204); // No Content
});

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Middle Sex Premier League API",
      version: "1.0.0",
      description: "API documentation for Middle Sex Premier League",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./routers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import and use the /api router
const apiRouter = require("./routers");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
