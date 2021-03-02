import { app } from "../../app";
import request from "supertest";

test("Testing Creation of Ticket", async () => {
  await request(app)
    .post("/api/tickets")
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);
});
