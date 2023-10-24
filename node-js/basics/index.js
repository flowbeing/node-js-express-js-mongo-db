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

const fs = require("fs");
const http = require("http");
const url = require("url");

const replacePlaceholders = require("./replace-placeholders/replace-placeholders");

// products data
var data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
var overviewPageHTMLString = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
var productPageHTMLString = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
var overviewPagesCardsHTMLString = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
var productsPageHTMLString = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

var server = http.createServer((request, response) => {
  // console.log(request);

  var path = request.url; // e.g /product?id=0;

  // products json to object
  let dataObject = JSON.parse(data);

  // defining path explicitly to extract path from a query
  let pathProperties = url.parse(path);
  let pathName = pathProperties.pathname; // e.g /product

  console.log("");

  // -----------------------------------------
  // LOGGING URL PROPERTIES
  console.log("LOGGING URL PROPERTIES");
  let pathObj = url.parse(path);

  for (let key of Object.keys(pathObj)) {
    console.log(`${key}: ${pathObj[key]}`);
  }
  // -----------------------------------------

  if (path == "/" || path == "/overview") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });

    // prepping overview page's products' cards
    let allProductsCards = dataObject.map((productData) => {
      // INCOMPLETE HERE - PRODUCTS CARDS PLACEHODERS HAVE NOT BEEN REPLACED
      // replacing products cards html codes' placeholders with real data
      productCardHtmlString = replacePlaceholders(
        overviewPagesCardsHTMLString,
        productData
      );

      return productCardHtmlString;
    });

    // ERROR HERE - CAN'T REPLACE ALREADY REPLACED "{%PRODUCTSOVERVIEW%}" UPON RELOAD
    response.end(
      overviewPageHTMLString.replace(
        /{%PRODUCTSOVERVIEW%}/g,
        allProductsCards.join("")
      )
    );
  } else if (pathName == "/product") {
    response.writeHead(200, {
      "Content-type": "text/html",
    });

    // let pathProperties = url.parse(path);
    // let pathName = pathProperties.pathname; // e.g /product

    // determining the query string // e.g id=0
    let queryString = pathProperties.query;
    if (queryString == "" || queryString == null) {
      queryString = "id=0";
    }
    console.log();
    console.log(`queryString: ${queryString}, type: ${typeof queryString}`);

    // extracting product number from query string (if specified)..
    let currentProductNumString = queryString.replace(/id=/g, "");
    console.log(`currentProductNumString: ${currentProductNumString}`);
    let currentProductNum = Number(currentProductNumString); //
    console.log(`currentProductNum: ${currentProductNum}`);
    console.log(`path: ${path}`);
    console.log(`currentProductNum: ${currentProductNum}`);

    // defining current product
    let currentProductDataObject = dataObject[currentProductNum];

    // prepping prodcts card, replacing placeholders
    let currentProductsInfoPage = replacePlaceholders(
      productsPageHTMLString,
      currentProductDataObject
    );

    // checking if a specified product (number) exists
    let numberOfExistingProducts = Object.keys(dataObject).length - 1;
    console.log("");
    console.log(`numberOfExistingProducts: ${numberOfExistingProducts}`);

    // determining whether the specified product number (if any) exists
    let isProductNumExist =
      currentProductNum < Object.keys(dataObject).length - 1;
    console.log(`currentProductNum: ${currentProductNum}`);
    console.log(`isProductNumExist: ${isProductNumExist}`);

    // if the specified product number exists, display the relevant page, else notify the user that it does
    // not exist..
    if (isProductNumExist) {
      response.end(currentProductsInfoPage);
    } else {
      response.end("<p>Product Not Found!</p>");
    }
  } else if (path == "/api") {
    response.writeHead(200, {
      "Content-type": "application/json",
    });

    response.end(data);
  } else {
    response.writeHead(400, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });

    response.end("<p>This is a paragraph</p>");
  }
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Http server is listening at port 8080");
});
