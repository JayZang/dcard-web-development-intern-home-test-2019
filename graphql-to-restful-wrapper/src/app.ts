import express from "express";
import bodyParser from "body-parser";

const app = express();

/**
 * Express Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Router
 */
import githubController from "./controllers/github"

// default router
app.get("/", (req, res) => {
  res.send("hello world");
});

// github proxy service
app.use("/github", githubController);

export default app;