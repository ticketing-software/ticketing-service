import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  public get client(): Stan {
    if (!this._client) {
      throw new Error("Cannot Access NATS client before connecting...");
    }
    return this.client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to the NATS");
        resolve();
      });

      this.client.on("error", (err) => {
        console.log("Unable to connect to the NATS");
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
