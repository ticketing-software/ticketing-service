import express from "express";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handling-middleware";
import { ticketRoute } from "./routes/test-route";

const app = express();

app.use(json());

app.use(ticketRoute);

app.use(errorHandler);

export { app };
