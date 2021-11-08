import { v4 as uuidv4 } from "uuid";

const logs: string[] = [];

const generateLog = () => {
  const date = new Date();
  const log = date.toISOString() + ": " + uuidv4();

  console.log(log);
  logs.push(log);

  setTimeout(generateLog, 5000);
};

generateLog();
