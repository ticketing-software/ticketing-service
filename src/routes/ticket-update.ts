import express, { Request, response, Response } from "express";
import { body } from "express-validator";
import { checkUser } from "../middlewares/check-current-user";
import TicketNotFoundError from "../errors/ticket-not-found-error";
import { Ticket } from "../models/ticket";
import NotAuthorizedError from "../errors/not-authorized-error";
import { validationRequest } from "../middlewares/validate-request";

const route = express.Router();

route.put(
  "/api/tickets/:id",
  checkUser,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  validationRequest,
  async (request: Request, response: Response) => {
    const ticket = await Ticket.findById(request.params.id);

    if (!ticket) {
      throw new TicketNotFoundError("Ticket Not Found");
    }

    if (ticket.userId !== request.currentUser.id) {
      throw new NotAuthorizedError("User Not Authorized");
    }

    ticket.set({
      title: request.body.title,
      price: request.body.price,
    });

    await ticket.save();

    response.send(ticket);
  }
);

export { route as updateTicketRoute };
