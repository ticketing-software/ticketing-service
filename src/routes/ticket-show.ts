import express, { Request, Response } from "express";
import TicketNotFoundError from "../errors/ticket-not-found-error";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (request: Request, response: Response) => {
  const ticket = await Ticket.findById(`${request.params.id}`);

  if (!ticket) {
    throw new TicketNotFoundError("Ticket Not Found");
    // response.status(404).send({ message: "Ticket Not found for given id" });
  } else {
    response.send(ticket);
  }
});

export { router as showTicketRouter };
