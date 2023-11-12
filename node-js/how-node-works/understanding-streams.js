const fs = require("fs");
const http = require("http");

// continuation of understanding require -> variables, function or class that are within exports or
// module.exports in relevant module's wrapper arguments will be accessible depending on whether
// module.exports has been used for exporting or not.
const subtract = require("./understanding-require");
console.log(`someVariables: ${subtract.add}`);

let server = http.createServer();

server.on("request", (req, res) => {
  // SOLUTION ONE - reading files asynchronously & without streams
  //   fs.readFile("test-file.txt", (err, data) => {
  //     res.end(data);
  //   });

  // SOLUTION TWO - reading files with streams and forwarding with res.write (may lead to back pressure)
  // Back pressure simply refers to the situation where chunks of data are not sent nearly as fast as they are received
  //   let readableFileStream = fs.createReadStream("test-file.txt");
  //   readableFileStream.on("data", (chunk) => {
  //     res.write(chunk); // an end event will be emitted when the res.write() (a writeable stream) operation's completed
  //   });

  //   readableFileStream.on("end", () => {
  //     console.log("File transfer complete.");
  //   });

  //   readableFileStream.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });

  // SOLUTION THREE - resolve backpressure; for speed and efficiency
  let readableFileStream = fs.createReadStream("test-file.txt");
  readableFileStream.pipe(res);
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Server is listening on port 8080");
});
