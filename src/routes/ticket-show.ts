import express, { Request, Response } from "express";
import NotFoundError from "../errors/not-found-error";
import UserCookieNotFound from "../errors/user-cookie-not-found";
import { checkTicket } from "../middlewares/check-ticket";

import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  checkTicket,
  async (request: Request, response: Response) => {
    const ticket = await Ticket.findById(`${request.params.id}`);

    if (!ticket) {
      throw new UserCookieNotFound("Ticket Not Found");
      // response.status(404).send({ message: "Ticket Not found for given id" });
    } else {
      response.send(ticket);
    }
  }
);

export { router as showTicketRouter };
