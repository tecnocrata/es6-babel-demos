//import myFunc from './11.default-export-function-1';
import suma from './11.default-export-function-params-1';
let w = suma(100, 500);
console.log(`w = ${w}`);

//Why .default? https://stackoverflow.com/questions/33704714/cant-require-default-export-value-in-babel-6-x
let z = (require('./11.default-export-function-params-1')).default(10,50);
console.log(`z = ${z}`);