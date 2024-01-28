const display = document.getElementById("display");
const btn = document.getElementsByClassName("btn");
let string = "";
let newString = "";

for (const button of btn) {
  button.addEventListener("click", () => {
    string += button.textContent;
    let buttonContent = button.textContent;

    //Operations to avoid wrong placing zeros
    if (buttonContent === "0") {
      if (
        string.charAt(string.length - 1) === buttonContent &&
        string.charAt(string.length - 2) === buttonContent
      ) {
        string = string.slice(0, -1);
        display.value = string;
      }
    } //Operations to avoid wrong placing zeros

    //Operations to avoid wrong placing simbols
    if (
      buttonContent === "*" ||
      buttonContent === "+" ||
      buttonContent === "-" ||
      buttonContent === "/" ||
      buttonContent === "."
    ) {
      //Para corregir doble simbolos

      if (
        string.charAt(string.length - 1) === buttonContent &&
        string.charAt(string.length - 2) === buttonContent
      ) {
        string = string.slice(0, -1);
        display.value = string;
      } else if (
        (string.charAt(string.length - 1) === "." &&
          string.charAt(string.length - 2) === ".") ||
        (string.charAt(string.length - 1) === "." &&
          string.charAt(string.length - 3) === ".") ||
        (string.charAt(string.length - 1) === "." &&
          string.charAt(string.length - 4) === ".")
      ) {
        string = string.slice(0, -1);
        display.value = string;
      }
    } //Operations to avoid wrong placing simbols
    display.value = string.trim();
  });
}

document.getElementById("equals").addEventListener("click", () => {
  let operation = '';
  let operationFixed = [];

  operation += "," + display.value;
  operationFixed = operation.split(",");

  let VariableOperationFixed = operationFixed[1];
  let simbols = "";
  let numbers = "";
  let generalOperation = "";
  for (let i = 0; i < VariableOperationFixed.length; i++) {
   
    if (parseFloat(VariableOperationFixed[i]) >= 0 || VariableOperationFixed[i]==='.') {
      numbers = VariableOperationFixed[i];
      generalOperation+= numbers
    }else if (
      VariableOperationFixed[i] === "+" ||
      VariableOperationFixed[i] === "*" ||
      VariableOperationFixed[i] === "-" ||
      VariableOperationFixed[i] === "/"
    ) {
      simbols += VariableOperationFixed[i];

      if (simbols.length >= 2 && VariableOperationFixed[i+1]>=0) {
        if(simbols.charAt(simbols.length-1)!== '-'){
          simbols = simbols.slice(-1)
          generalOperation+= simbols;
        }else if(simbols.charAt(simbols.length-1)== '-' && generalOperation.length > 4){
          simbols = simbols.slice(-1)
          generalOperation+= simbols; 
        }else {
          generalOperation+= simbols; 
        }
      }else if(simbols.length == 1 && VariableOperationFixed[i+1]>=0){ //PARA X*Y
        generalOperation+= simbols;
      }
    }
    
    /* generalOperation+= simbols */
    console.log("general " + generalOperation);
  }

  try {
    display.value = eval(generalOperation);
    string = display.value;
  } catch (error) {
    display.value = "BAD OPERATION";
  }
});
document.getElementById("clear").addEventListener("click", () => {
  string = " ";
  display.value = "0";
});