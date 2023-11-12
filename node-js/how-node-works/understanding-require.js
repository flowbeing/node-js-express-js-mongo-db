let someVariable = 2;
exports.someVariable = someVariable;

// EXPORTS - MAIN -> varaible, functions, classes are stored within the module.export (2) section (key, value pair) of this module's wrapper argument object (map)
// module.exports = someVariable;
module.exports = {
  someVariable: class {
    className() {
      console.log("An Anonymous Class");
    }
  },
  add: (a, b) => a + b,
  additionalVariable: console.log("Some additional variable"),
};

// EXPORTS: EXPORTS SHORTAND -> variables, functions, classes are stored within the exports (0) section (key, value pair) of this module's wrapper argument object (map)
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;

console.log("Wrapper function arguments");
console.log(arguments);

console.log();
console.log();

console.log("Wrapper function");

console.log(require("module").wrapper);

// OOP MINOR REVIEW (INHERITANCE)
// class SomeParentClass {
//   constructor() {
//     console.log("SomeParentClass");
//   }
//
//   extraTextInParentClass() {
//     console.log("extraTextInParentClass");
//   }
// }
//
// class SomeClass extends SomeParentClass {
//   constructor() {
//     super(); // creates a temporary instance of SomeParentClass for accessiblity in SomeClass
//   }
//
//   someFunction() {
//     return "someFunction";
//   }
// }
//
// let someClass = new SomeClass();
// someClass.someFunction();
// someClass.extraTextInParentClass();
