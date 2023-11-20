let fs = require('fs');
// let aPromise = new Promise();

let readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${file}`, 'utf-8', (error, data) => {
      if (error) reject('File Not Found');
      resolve(data);
    });
  });
};

let writeFilePro = (file, dataStringToWrite) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/${file}`, dataStringToWrite, (error) => {
      if (error) reject(error);
      resolve('File has been written 😃');
    });
  });
};

// calling readFilePro
readFilePro('dog.txt')
  .then((data) => {
    console.log(`data: ${data}`);
  })
  .catch((error) => {
    console.log(`readFilePro error: ${error}`);
  });

// calling writeFilePro
writeFilePro('dog.txt', 'retriever')
  .then((result) => {
    console.log(`writeFile result: ${result}`);
  })
  .catch((error) => {
    console.log(`writeFile error: ${error}`);
  });

//TO INCLUDE ASYNC AWAIT
