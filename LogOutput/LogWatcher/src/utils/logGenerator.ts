import { v4 as uuidv4 } from "uuid";
import { create } from "apisauce";

const api = create({
  baseURL: "http://pingpong-service.log-output",
  timeout: 5000,
});

const getPingPongs = async () => {
  const response = await api.get("/pingpongs");
  if (response.ok) {
    console.log("getPingPongs> ok");
    return response.data;
  }
  if (response.problem) {
    console.error("getPingPongs> problem: ", response.problem);
    return;
  }
};

// const directory = path.join("/", "usr", "src", "app", "files");
// const filePath = path.join(directory, "logs.txt");

// const checkFileExists = async (fileName: string): Promise<boolean> => {
//   try {
//     await access(fileName, constants.F_OK);
//     return true;
//   } catch (e) {
//     if (e instanceof Error) {
//       console.error(`${fileName} does not exist: ${e.message}`);
//     }
//   }
//   return false;
// };

// const readTimestampFromFile = async (fileName: string) => {
//   if (await checkFileExists(fileName)) {
//     const data = await readFile(fileName);
//     return data.toString().trim().split("\n").at(-1);
//   }
//   throw new Error(`${fileName} does not exist`);
// };

// const getPingPongRequests = async (fileName: string) => {
//   if (await checkFileExists(fileName)) {
//     const data = await readFile(fileName);
//     return data.toString().trim();
//   }
//   throw new Error(`${fileName} does not exist`);
// };

export const generateLog = async () => {
  const pingpongStatus = await getPingPongs();
  if (pingpongStatus) {
    const date = new Date();
    const timestamp = date.toISOString();
    const log = `
    <p>${process.env.MESSAGE}</p>
    <p>${timestamp}: ${uuidv4()}</p>
    <p>${pingpongStatus}</p>
    `;
    console.log(log);
    return log;
  }
};
