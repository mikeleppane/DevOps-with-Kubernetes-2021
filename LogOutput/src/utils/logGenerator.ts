import { v4 as uuidv4 } from "uuid";

const logs: string[] = [];

export const generateLog = () => {
  const date = new Date();
  const log = date.toISOString() + ": " + uuidv4();

  console.log(log);
  logs.push(log);

  setTimeout(generateLog, 5000);
};

export const getLatestLog = () => {
  return logs.at(-1);
};
