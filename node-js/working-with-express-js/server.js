const app = require("./app");

const portNum = 3000;

app.listen(portNum, () => {
  console.log(`listening on port: ${portNum}`);
});
