const express = require("express");
const portNum = 3000;

// creates an express application
let app = express();

app.get("/", (request, response) => {
  // a simplified send operation that would have required:
  // 1. obtaining and specifying the request path "/" manually with request.url and a conditional if statement (if (request.url == "/"){...}) in NodeJS
  // 2. writing status code to head with response.writeHead(200, Content-type: "text")
  // 3. manually sending a message to the browser with response.end("some message")
  response.status(200).send("Hello from the server side!");

  // response.status(200).json({message: "some message", app: "App Name"});
});

// returns a http server. The default host address is "127.0.0.1"
app.listen(portNum, () => {
  console.log(`listening on port: ${portNum}`);
});
