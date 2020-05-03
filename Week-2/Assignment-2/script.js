function calculate(args) {
  let result;
  if (args.op === "+") {
    result = args.n1 + args.n2;
  } else if (args.op === "-") {
    result = args.n1 - args.n2;
  } else {
    result = "Not supported";
  }
  return result;
}

// // JSON literal
let myJSON = { n1: 3, n2: 4 };
console.log(calculate(myJSON));


// create Object
class calCreateObj {
  constructor(getN1, getN2) {
    this.getN1 = getN1;
    this.getN2 = getN2;
  }
}

let myObj = new calCreateObj(3, 4);
console.log(calculate(myObj));
