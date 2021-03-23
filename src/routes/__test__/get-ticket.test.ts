import request from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { Ticket } from "../../models/ticket";

// test("Returns a 404 if ticket is not found", async () => {
//   const response = await request(app).get("/api/tickets/uiohsihef").send();
//   // console.log(response.body);
// });

test("Returns the ticket if the ticket is found", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);

  console.log(response.body);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.ticket.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual("Some Custom Title");
  expect(ticketResponse.body.price).toEqual(20.0);
});
