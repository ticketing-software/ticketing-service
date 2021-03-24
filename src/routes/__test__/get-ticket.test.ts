import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { Ticket } from "../../models/ticket";
import mongoose from "mongoose";

test("Returns a 404 if ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

test("Returns the ticket if the ticket is found", async () => {
  const ticketName = "Custom";
  const thePrice = 20.0;

  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: ticketName, price: thePrice })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.ticket.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual(ticketName);
  expect(ticketResponse.body.price).toEqual(thePrice);
});
