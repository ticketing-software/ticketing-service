import express, { Request } from "express";
import { json } from "body-parser";
import { errorHandler } from "./middlewares/error-handling-middleware";
import { ticketRoute } from "./routes/ticket-create";
import { PathNotFoundException } from "./errors/path-not-found-error";
import { showTicketRouter } from "./routes/ticket-show";

const app = express();

app.use(json());

app.use(ticketRoute);
app.use(showTicketRouter);

// Looks out for unspecified routes
app.all("*", (request: Request) => {
  throw new PathNotFoundException("Given Path Not found", request.path);
});

app.use(errorHandler);

export { app };
