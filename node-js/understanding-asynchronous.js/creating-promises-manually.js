let fs = require('fs');
let superagent = require('superagent');
// let aPromise = new Promise();

// CREATING PROMISES MANUALLY WITH FS.READFILE
let readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${file}`, 'utf-8', (error, data) => {
      if (error) reject('File Not Found');
      resolve(data);
    });
  });
};

// CREATING PROMISES MANUALLY WITH FS.READFILE
let writeFilePro = (file, dataStringToWrite) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/${file}`, dataStringToWrite, (error) => {
      if (error) reject(error);
      resolve('File has been written 😃');
    });
  });
};

// calling readFilePro
// readFilePro('dog.txt')
//   .then((data) => {
//     console.log(`data: ${data}`);
//   })
//   .catch((error) => {
//     console.log(`readFilePro error: ${error}`);
//   });

// calling writeFilePro
// writeFilePro('dog.txt', 'retriever')
//   .then((result) => {
//     console.log(`writeFile result: ${result}`);
//   })
//   .catch((error) => {
//     console.log(`writeFile error: ${error}`);
//   });

//USING ASYNC AWAIT
async function data() {
  let data = await readFilePro('dog.txt');
  console.log(`data - within async data function: ${data}`); // data has been resolve here i.e 'data' variable holds a string value instead of a promise

  let response = await superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(
    `response - within async data function: ${response.body.message}`
  );
  console.log();

  // working with promise.all()
  let responsePromise1 = superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );

  let responsePromise2 = superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );

  let responsePromise3 = superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );

  // Promise.all() simply returns a list of promises
  let allPromises = Promise.all([
    responsePromise1,
    responsePromise2,
    responsePromise3,
  ]);

  // values of allPromises - a list of values obtained from a list of all promises (responsePromise1, responsePromise2, responsePromise3)
  let listOfValues = await allPromises;

  // console.log(
  //   `allPromises: ${allPromises.then((result) => console.log(result[0]))}`
  // );

  // console.log(responsePromise3);

  fs.writeFile(
    'dog-images.txt',
    listOfValues.map((response) => response.body.message).join('\n'),
    (err) => console.log('images urls saved to file')
  );

  // writeFilePro('other-file.txt', response.body.message);

  return data;
}

// the async data function returns a promise. However, the variable within the function that uses "await" returns a string
// VISUALISING THE CODE
console.log(`TOP LEVEL PRE ASYNC FUNCTION`);
console.log(`async data function: ${data()}`);
console.log(`TOP LEVEL POST ASYNC FUNCTION`);
