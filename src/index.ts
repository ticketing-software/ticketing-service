import { app } from "./app";
import { connectDB } from "./connectDB";
import { natsWrapper } from "./nats-wrapper";
import { connectNats } from "./connect-nats";

let PORT = process.env.PORT || 3002;

connectNats("ticketing", "sfiesd", "http://nats-srv:4222");
connectDB();

app.listen(PORT, () => {
  console.log(`Started at PORT ${PORT}`);
});
