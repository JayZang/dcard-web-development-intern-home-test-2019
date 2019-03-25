import express from "express";
import bodyParser from "body-parser";

const app = express();

/**
 * Express Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Global Middleware
 */
import rateLimiterMiddleware from "./middlewares/rate-limiter";

app.use(rateLimiterMiddleware);

/**
 * Http Router
 */
import * as homeControllers from "./controllers/home";

app.get("/", homeControllers.home)

export default app;