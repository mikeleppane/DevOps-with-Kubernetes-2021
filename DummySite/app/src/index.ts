import scrape = require("website-scraper");

import fs = require("fs");

console.log(process.argv);

const websiteUrl = process.argv[2] || "https://adventofcode.com/";
const outputDir = "./dummysite/";

const options = {
  urls: [websiteUrl],
  directory: outputDir,
};

const removeDirIfExists = () => {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
};

removeDirIfExists();

scrape(options)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
