import { app } from "../../app";
import request from "supertest";
import jwt from "jsonwebtoken";

test("Testing Creation of Ticket without User Cookie", async () => {
  await request(app)
    .post("/api/ticket")
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(403);
});

test("Expecting an error due to no ticket title", async () => {
  await request(app).post("/api/ticket").send({ price: 20.0 }).expect(403);
});

test("Expecting an error of Ticket with User Cookie without price", async () => {
  await request(app)
    .post("/api/ticket")
    .send({ title: "Some Custom Title" })
    .expect(403);
});

test("Testing Creation of Ticket with User Cookie and without title", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ price: 20.0 })
    .expect(400);
});

test("Testing Creation of Ticket with User Cookie and without price", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title" })
    .expect(400);
});

test("Testing Creation of Ticket with User Cookie", async () => {
  const payload = {
    id: "asaeoih",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, "asdf");

  const createdCookie = `user=${token}`;

  await request(app)
    .post("/api/ticket")
    .set("Cookie", createdCookie)
    .send({ title: "Some Custom Title", price: 20.0 })
    .expect(201);
});
