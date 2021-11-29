import { connect, NatsConnection, StringCodec } from "nats";
import { sendMessageToTeleGram } from "./teleGram";

export class QueueGroup {
  static queueName = "todo-group";
  static numberOfMembers = 0;

  static register() {
    QueueGroup.numberOfMembers += 1;
  }

  static getID() {
    return QueueGroup.numberOfMembers;
  }

  static getName() {
    return QueueGroup.name;
  }
}

export class NatsSubscriber {
  static nc: NatsConnection | undefined = undefined;
  private readonly name = "todo-service";
  private strCodec = StringCodec();
  private readonly natsServer = process.env.NATS_URL;

  async connect() {
    try {
      QueueGroup.register();
      NatsSubscriber.nc = await connect({
        servers: this.natsServer,
        name: `${this.name}-${QueueGroup.getID()}`,
      });
      console.log(`connected to ${NatsSubscriber.nc.getServer()}`);
      console.log(NatsSubscriber.nc);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `An error occurred while trying to connect NATS server: ${error.message}`
        );
      }
    }
  }

  async subscribe(topic: string) {
    if (NatsSubscriber.nc) {
      try {
        const sub = NatsSubscriber.nc.subscribe(topic, {
          queue: QueueGroup.queueName,
        });
        console.log(
          `${NatsSubscriber.nc.info?.client_id} is listening for ${topic}...`
        );
        for await (const m of sub) {
          console.log(
            `[${sub.getProcessed()}]: ${this.strCodec.decode(m.data)}`
          );
          sendMessageToTeleGram(this.strCodec.decode(m.data));
        }
        await NatsSubscriber.nc.drain();
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    } else {
      console.warn("No connection to NATS!");
    }
  }
}
