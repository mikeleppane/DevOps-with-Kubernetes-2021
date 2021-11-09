import { appendFile } from "fs/promises";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

export const generateTimeStamp = () => {
  const date = new Date();
  const timestamp = date.toISOString();

  saveTimestampToFile(timestamp).catch((e) => console.error(e));

  setTimeout(generateTimeStamp, 5000);
};

const saveTimestampToFile = async (timestamp: string) => {
  try {
    await appendFile(filePath, timestamp + "\n");
    console.log(`Timestamp (${timestamp}) added to the file ${filePath}`);
  } catch (e) {
    if (e instanceof Error) {
      console.error(
        `Appending timestamp to the file ${filePath} failed: ${e.message}`
      );
    }
    console.error(
      `Unknown error occurred while appending timestamp to the file ${filePath}: ${e}`
    );
  }
};

generateTimeStamp();
