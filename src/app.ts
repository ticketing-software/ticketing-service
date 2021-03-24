import express, { Request } from "express";
import { json } from "body-parser";
import "express-async-errors";
import { errorHandler } from "./middlewares/error-handling-middleware";
import { ticketRoute } from "./routes/ticket-create";
import { PathNotFoundException } from "./errors/path-not-found-error";
import { showTicketRouter } from "./routes/ticket-show";
import { getAllTicketsRoute } from "./routes/ticket-show-all";
import { updateTicketRoute } from "./routes/ticket-update";

const app = express();

app.use(json());

app.use(ticketRoute);
app.use(showTicketRouter);
app.use(getAllTicketsRoute);
app.use(updateTicketRoute);
// Looks out for unspecified routes
app.all("*", (request: Request) => {
  throw new PathNotFoundException("Given Path Not found", request.path);
});

app.use(errorHandler);

export { app };
