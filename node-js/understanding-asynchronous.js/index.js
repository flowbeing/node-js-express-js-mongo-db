const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  console.log(`data:  ${data}`);

  // get returns a promise, same as end
  // This whole line of code is similar to "requests.get(f'https://dog.ceo/api/breed/retriever/images/random').content" in python
  superagent
    .get(`dog.ceo/api/breed/${data}/images/random`)
    .end((error, response) => {
      if (error !== null) console.log(error.message);
      if (error === null) {
        console.log(`res: ${response.body.message}`);

        fs.writeFile(
          `${__dirname}/dog-images.txt`,
          response.body.message,
          (error) => {
            if (error !== null)
              console.log(
                'An error occured while writing the file to dog-images.txt'
              );
          }
        );
      }
    });
});
