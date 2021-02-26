import { app } from "./app";
import { connectDB } from "./connectDB";

let PORT = process.env.PORT || 3002;

connectDB();

app.listen(PORT, () => {
  console.log(`Started at PORT ${PORT}`);
});
