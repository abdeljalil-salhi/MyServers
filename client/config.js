const setEnv = () => {
  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "./src/environment.ts";

  require("dotenv").config({
    path: ".env",
  });

  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  API_URL: '${process.env.API_URL || "http://localhost:8080"}',
  production: true,
};
`;

  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
  });
};
setEnv();
