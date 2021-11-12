import { create } from "apisauce";
import path from "path";
import { access, mkdir } from "fs/promises";
import * as fs from "fs";
import { constants } from "fs";

const directory = path.join("/", "usr", "src", "app", "files");
const imagePath = path.join(directory, "image.jpg");

const api = create({
  baseURL: "http://picsum.photos/1200",
  timeout: 10000,
  responseType: "stream",
});

export const getImage = async () => {
  if (!(await checkImageExists(imagePath))) {
    try {
      await mkdir(directory);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
    const { ok, problem, data } = await api.get("");
    if (ok) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data.pipe(fs.createWriteStream(imagePath));
      console.log(`Image ${imagePath} created`);
    }
    if (problem) {
      console.log("getInfo> problem: ", problem);
    }
  }
  console.log(`Image already exists at: ${imagePath}`);
};

const checkImageExists = async (imagePath: string): Promise<boolean> => {
  try {
    await access(imagePath, constants.F_OK);
    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.error(`${imagePath} does not exist: ${e.message}`);
    }
  }
  return false;
};
