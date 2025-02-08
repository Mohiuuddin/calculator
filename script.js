let operand1 = 0;
let operand2 = 0;
let operator = "";
let selectedValue= "";
const decimalBtn = document.querySelector("#decimal");


function addition (a, b){
    return a+b;
}

function subtraction (a,b){
   
    return a-b;
} 
function division(a, b) {
    if ( b !== 0) {
        return a / b;
    } else {
        alert("Cannot divide by 0");
        return 0;
    }
} 
function multiplication(a, b){
    return a * b;
} 



function operate (operand1, operator, operand2){
   if(operator === "+"){
    return addition(operand1, operand2);
   } else if (operator === "-"){
    return subtraction(operand1, operand2);
   } else if (operator === "/"){
    return division(operand1, operand2);
   } else if (operator === "*") {
    return multiplication(operand1, operand2);
   } else {
    return 0;
   }

}

const display = document.querySelector("#display");
function limitLength(value) {
    return value.length > 20 ? value.slice(0, 20) : value;
}

function digitSelection (){
    const digits = document.querySelectorAll(".digit");
    digits.forEach( digit => {
        digit.addEventListener("click", ()=>{

            if (selectedValue.length >= 20) {
                return; // Don't allow adding more digits if length exceeds 20
            }


            if (digit.value === "." && selectedValue === "") {
                selectedValue = "0."; // Start with 0. if there's nothing typed
                display.textContent = selectedValue;
                decimalBtn.disabled = true; // Disable the decimal button after first use
                return;
            }

            // Prevent multiple decimals in the same number
            if (digit.value === "." && selectedValue.includes(".")) {
                return;
            }

            selectedValue += digit.value;

            if (selectedValue.charAt(0) === "0" && selectedValue.length > 1 && !selectedValue.includes(".")) {
                // Strip the leading zero (and if there's a decimal, keep it)
                selectedValue = selectedValue.slice(1);
                display.textContent = selectedValue;
            } else {
                display.textContent = selectedValue;
            }
            

              
        });
    });
   
}

function operatorSelection(){
    const operators = document.querySelectorAll(".operator");
    operators.forEach(operatorElm => {
        operatorElm.addEventListener("click", ()=>{

            if(selectedValue === "" && operand1===0){
                return;
            } 

            if(operator){
                return;
            }

            if (selectedValue !== "") {
                operand1 = parseFloat(selectedValue);
                selectedValue = "";  // Reset selectedValue for the next input
            }

            if(operator === ""){
                operator = operatorElm.value;
            }
            
            // operator = operatorElm.value;
            display.textContent= operator;
            decimalBtn.disabled=false;
            
        });
    });
}

function equalOperation() {
   
    if(operator && selectedValue){
        operand2 = parseFloat(selectedValue);
        const result = operate(operand1, operator, operand2);
        display.textContent= result;
        selectedValue = limitLength(result.toString());
        operand1 = result;
        operator = "";
        operand2 = 0;
        
    } 
}

const percent = document.querySelector("#percent");
percent.addEventListener("click", () => {
   // alert(operand1 + " " + operand2 + " " + operator);
    
    if (operator === "" && selectedValue !== "") {
        
        operand1 = parseFloat(selectedValue) / 100;
        display.textContent = limitLength(operand1.toString());
        selectedValue = operand1.toString(); // Update selectedValue
    } else if (operator !== "" && selectedValue === "") {
        
        return;
    }

    
});


const equal = document.querySelector("#equal");
equal.addEventListener("click", ()=>{
   equalOperation();
});



function reset(){
    display.textContent = "0";
    selectedValue = "";
    operand1= 0;
    operand2 = 0;
    operator= "";
    decimalBtn.disabled=false;
}
const clear = document.querySelector("#reset");
clear.addEventListener("click", ()=>{
    reset();   
});



digitSelection();
operatorSelection();


