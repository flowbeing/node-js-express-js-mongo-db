

// a method that replaces placeholders in template-card's html code- overviewPagesCardsHTMLString
// 'cardHtmlString' represents the card element for each product
// 'replacement' represents the data that will be inserted into each product's card element
module.exports = (cardHtmlString, replacement) => {

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