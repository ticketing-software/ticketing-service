import { natsWrapper } from "./nats-wrapper";

async function connectNats(clusterId: string, clientId: string, url: string) {
  try {
    await natsWrapper.connect(clusterId, clientId, url);

    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
  } catch (err) {
    console.log(err);
  }
}

export { connectNats };
