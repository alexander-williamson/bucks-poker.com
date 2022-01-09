const fs = require("fs-extra");
const glob = require("glob-promise");
const path = require("path");
const xlsx = require("xlsx");

const runAsync = async () => {
  const pattern = path.join(__dirname, "../app/data/**.xlsx");
  const files = await glob(pattern);
  for (const file of files) {
    console.debug(file);
    const workBook = xlsx.readFile(file);
    const outfile = file.replace(/.xlsx/, ".csv");
    if (fs.existsSync(file)) await fs.unlink(file);
    xlsx.writeFile(workBook, outfile, {
      bookType: "csv",
    });
  }
  console.info(`Success`);
};

runAsync();
