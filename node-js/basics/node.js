// const fileSystem = require('fs');

// const inputText = fileSystem.readFileSync("./txt/input.txt", "utf-8");

// console.log(inputText);

// const newT = "newText";

// fileSystem.writeFileSync("./txt/input.txt", newT);

// const readInputTextFile = fileSystem.readFileSync("./txt/input.txt", "utf-8");

// console.log(readInputTextFile);

// const newT2 = "another";

// fileSystem.writeFileSync("./txt/input.txt", newT2);

// const readInputTextFile2 = fileSystem.readFileSync("./txt/input.txt", "utf-8");

// myArray = ["string"];

// console.log(myArray);

// // Asychronous file read
// fileSystem.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     console.log(`File data -> ${data}`);
// });

// fileSystem.writeFile('./txt/start.txt', 'read-this', err => {
//     console.log("File has been written");
// });

// console.log('Post Read File');


const http = require('http');

var server = http.createServer(
    (request, response) => {
        console.log(request);
        response.end('this is a response')
    }
);

server.listen(8080, "127.0.0.1", () => {
    console.log('Http server is listening at port 8080');
});