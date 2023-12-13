const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });

const app = require("./app");

const portNum = 3000;

console.log(`__dirname: ${__dirname}`);

// console.log(`app.get('env'): ${app.get("env")}`); // retrieves the environment an express app is running in

// console.log(`process.env: ${JSON.stringify(process.env)}`); // retrieves all environmental variable that have been derined for a node app

app.listen(portNum, () => {
  console.log(`listening on port: ${portNum}`);
});
