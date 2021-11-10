import { writeFile } from "fs/promises";
import path from "path";

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

export const saveRequestsToFile = async (numberOfRequests: number) => {
  try {
    await writeFile(
      filePath,
      "Ping / Pong: " + numberOfRequests.toString() + "\n"
    );
    console.log(`Number of pingpong requests added to the file ${filePath}`);
  } catch (e) {
    if (e instanceof Error) {
      console.error(
        `Appending the number of pingpong requests to the file ${filePath} failed: ${e.message}`
      );
    }
    console.error(
      `Unknown error occurred while appending number of pingpong requests to the file ${filePath}: ${e}`
    );
  }
};
