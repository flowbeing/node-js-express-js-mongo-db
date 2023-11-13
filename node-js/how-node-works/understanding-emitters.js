const EventEmitter = require("events");
const http = require("http");
const fs = require('fs');
fs.ReadStream()

let server = http.createServer();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

let myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("A new sales has been made");
});

myEmitter.on("discountAllowed", (discountAmount) => {
  console.log(`A ${discountAmount} discount was allowed`);
});

myEmitter.emit("newSale");
myEmitter.emit("discountAllowed", 9);

server.on("request", (req, res) => {
  console.log("request callback executed");
  console.log(`request url: ${req.url}`);
  res.end("responsed");
});

server.on("request", (req, res) => {
  console.log("another request");
  console.log(`request url: ${req.url}`);
  console.log();
});

server.listen("1234", "127.0.0.1", () => {
  console.log("listening at 127.0.0.1:1234");
});
