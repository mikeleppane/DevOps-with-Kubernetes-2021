import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "postgres",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASSWORD,
  {
    host: "postgres-db-svc.log-output",
    dialect: "postgres",
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (err) {
    console.log("connecting database failed");
    return process.exit(1);
  }

  return null;
};
