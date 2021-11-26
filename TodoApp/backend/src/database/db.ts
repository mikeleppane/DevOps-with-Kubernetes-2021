import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "todoapp-db",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD || "postgres",
  {
    host: "postgres-db-svc.todoapp",
    dialect: "postgres",
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
    return { ok: true };
  } catch (err) {
    console.log("connecting database failed");
  }

  return { ok: false };
};
