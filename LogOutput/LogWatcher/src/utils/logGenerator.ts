import { v4 as uuidv4 } from "uuid";
import { access, readFile } from "fs/promises";
import { constants } from "fs";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

const checkFileExists = async (fileName: string): Promise<boolean> => {
  try {
    await access(fileName, constants.F_OK);
    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`${fileName} does not exist: ${e.message}`);
    }
  }
  return false;
};

const readTimestampFromFile = async (fileName: string) => {
  if (await checkFileExists(fileName)) {
    const data = await readFile(fileName);
    return data.toString().trim().split("\n").at(-1);
  }
  throw new Error(`${fileName} does not exist`);
};

export const generateLog = async () => {
  try {
    const timestamp = await readTimestampFromFile(filePath);
    const log = timestamp + ": " + uuidv4();
    console.log(log);
    return log;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
  }
};
