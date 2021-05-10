import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validationRequest } from "../middlewares/validate-request";
import { checkUser } from "../middlewares/check-current-user";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const route = Router();

route.post(
  "/api/ticket",
  checkUser,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price Must be greater than zero"),
  ],
  validationRequest,
  async (request: Request, response: Response) => {
    const { title, price } = request.body;

    const payload = request.currentUser;

    if (payload) {
      const ticket = Ticket.build({ title, price, userId: payload.id });
      // const ticket = new Ticket({ title, price, userId: payload.id });
      await ticket.save();

      new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });

      response.status(201).send({ ticket });
    } else {
      response.send({ message: "Didn't Receive Cookie" });
    }
  }
);

export { route as ticketRoute };
