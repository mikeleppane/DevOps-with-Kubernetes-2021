import { connect, NatsConnection, StringCodec } from "nats";

export class NatsPublisher {
  static nc: NatsConnection | undefined = undefined;
  private strCodec = StringCodec();
  private readonly natsServer = process.env.NATS_URL;

  async connect() {
    try {
      NatsPublisher.nc = await connect({
        servers: this.natsServer,
      });
      console.log(`connected to ${NatsPublisher.nc.getServer()}`);
      console.log(NatsPublisher.nc);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `An error occurred while trying to connect NATS server: ${error.message}`
        );
      }
    }
  }

  publish(topic: string, message: string) {
    if (NatsPublisher.nc) {
      console.warn(`Publishing "${message}" to topic: ${topic}`);
      NatsPublisher.nc.publish(topic, this.strCodec.encode(message));
    } else {
      console.warn("No connection to NATS!");
    }
  }
}
