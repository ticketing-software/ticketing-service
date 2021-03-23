import express, { Request, Response } from "express";
import NotFoundError from "../errors/not-found-error";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (request: Request, response: Response) => {
  const ticket = await Ticket.findById(request.params.id);

  if (!ticket) {
    throw new NotFoundError("Ticket Not Found");
  }

  response.send(ticket);
});

export { router as showTicketRouter };
