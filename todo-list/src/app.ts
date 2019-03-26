import express from "express";
import bodyParser from "body-parser";

const app = express();

/**
 * Express Configuration
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Router
 */

export default app;