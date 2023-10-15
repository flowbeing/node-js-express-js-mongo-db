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

const fs = require('fs');
const http = require('http');
const url = require('url');

// products data
var data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
var overviewPageHTMLString = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
var productPageHTMLString = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
var overviewPagesCardsHTMLString = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

// a method that replaces placeholders in template-card's html code- overviewPagesCardsHTMLString
// 'cardHtmlString' represents the card element for each product
// 'replacement' represents the data that will be inserted into each product's card element
function replaceCardPlaceholders(cardHtmlString, replacement){

    let productCardHtmlString = cardHtmlString.replace(/{%IMAGE%}/g, replacement.image);
    productCardHtmlString = productCardHtmlString.replace(/{%PRODUCTNAME%}/g, replacement.productName);
    productCardHtmlString = productCardHtmlString.replace(/{%QUANTITY%}/g, replacement.quantity);
    productCardHtmlString = productCardHtmlString.replace(/{%PRICE%}/g, replacement.price);
    productCardHtmlString = productCardHtmlString.replace(/{%ID%}/g, replacement.id);
    
    if (replacement.organic == false){
        productCardHtmlString = productCardHtmlString.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }

    console.log(`replacedCardHtmlCardHolder`);
    console.log(`${productCardHtmlString}`);
        


    return productCardHtmlString;
}



var server = http.createServer(
    (request, response) => {
        // console.log(request);
        
        var path = request.url;
        console.log(`path: ${path}`);

        if (path == "/" || path == "/overview"){
            response.writeHead(
                200,
                {
                    "Content-type": "text/html"
                }                
            )

            // prepping overview page's products' cards
            let dataObject = JSON.parse(data);
            let allProductsCards = dataObject.map((productData) => {

                // INCOMPLETE HERE - PRODUCTS CARDS PLACEHODERS HAVE NOT BEEN REPLACED
                // replacing products cards html codes' placeholders with real data
                productCardHtmlString = replaceCardPlaceholders(overviewPagesCardsHTMLString, productData);
                
                return productCardHtmlString;
            });

            // ERROR HERE - CAN'T REPLACE ALREADY REPLACED "{%PRODUCTSOVERVIEW%}" UPON RELOAD
            response.end(
                overviewPageHTMLString.replace(
                    /{%PRODUCTSOVERVIEW%}/g,
                    allProductsCards.join("")
                    )
                );

        }
        else if(path.includes("/product?")){
            response.writeHead(
                200,
                {
                    "Content-type": "text/html"
                }
            )

            response.end(productPageHTMLString);
        }
        else if(path == "/api"){
            response.writeHead(
                200,
                {
                    "Content-type": "application/json"
                }
            );

            response.end(data);
        }
        else{
            response.writeHead(
                400,
                {
                    "Content-type": "text/html",
                    "my-own-header": "hello-world"
                }
            );

            response.end("<p>This is a paragraph</p>");
        }
    }
);

server.listen(8080, "127.0.0.1", () => {
    console.log('Http server is listening at port 8080');
});