const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

const portNum = 3000;

// console.log(`__dirname: ${__dirname}`);
// console.log(`proces.env: ${Object.keys(process.env)}`);
// console.log(process.argv);

console.log('HERE3');
console.log();

// console.log(`app.get('env'): ${app.get("env")}`); // retrieves the environment an express app is running in

// console.log(`process.env: ${JSON.stringify(process.env)}`); // retrieves all environmental variable that have been derined for a node app

app.listen(portNum, '127.0.0.1', () => {
  console.log(`listening on port: ${portNum}`);
});

console.log('HERE4');
console.log();

// console.log();
// let map = { id: '1', state: 'start' };
// map = Object.assign({ state: 'midpoint' }, map);
// console.log(map);
