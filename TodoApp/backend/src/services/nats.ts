import { connect, NatsConnection, StringCodec } from "nats";

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

export class NatsService {
  static nc: NatsConnection | undefined = undefined;
  private readonly name = "todo-service";
  private strCodec = StringCodec();
  private readonly natsServer = process.env.NATS_URL;

  async connect() {
    try {
      QueueGroup.register();
      NatsService.nc = await connect({
        servers: this.natsServer,
        name: `${this.name}-${QueueGroup.getID()}`,
      });
      console.log(`connected to ${NatsService.nc.getServer()}`);
      console.log(NatsService.nc);
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `An error occurred while trying to connect NATS server: ${error.message}`
        );
      }
    }
  }

  publish(topic: string, message: string) {
    if (NatsService.nc) {
      console.warn(`Publishing "${message}" to topic: ${topic}`);
      NatsService.nc.publish(topic, this.strCodec.encode(message));
    } else {
      console.warn("No connection to NATS!");
    }
  }

  async subscribe(topic: string) {
    if (NatsService.nc) {
      try {
        const sub = NatsService.nc.subscribe(topic, {
          queue: QueueGroup.queueName,
        });
        console.log(
          `${NatsService.nc.info?.client_id} is listening for ${topic}...`
        );
        for await (const m of sub) {
          console.log(
            `[${sub.getProcessed()}]: ${this.strCodec.decode(m.data)}`
          );
        }
        await NatsService.nc.drain();
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
