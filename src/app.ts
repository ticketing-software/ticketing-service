import express from "express";
import { createNewRoute } from "./routes/create-new-ticket";
import { json } from "body-parser";

const app = express();

app.use(json());

app.use(createNewRoute);

export { app };
