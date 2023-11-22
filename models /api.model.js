const fs = require("fs/promises");

exports.requireApi = () => {

  return fs.readFile(`${__dirname}/../endpoints.json`, "utf-8").then((data, err) => {
    const parsedData = JSON.parse(data);
    return parsedData;
  });
};
