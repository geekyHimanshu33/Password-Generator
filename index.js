const inputSlider = document.querySelector(".slider");
const showLength = document.querySelector(".showLength");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const tick = document.querySelectorAll("[inputcheck]");
const indicator = document.querySelector(".indicator")
const upperCase = document.querySelector("#upperCase")
const lowerCase = document.querySelector("#lowerCase")
const Numbers = document.querySelector("#Numbers")
const Symbols = document.querySelector("#Symbols")
const password = document.querySelector(".password");
const copy = document.querySelector(".copy");
const copybtn = document.querySelector(".copyButton");
const finalBtn = document.querySelector(".btn");






let passwordLength  = 10;

inputValue();
let checkcount = 0;

function inputValue(){
    inputSlider.value = passwordLength;
    //password length display pe show karo 
    showLength.innerText = passwordLength;
    password.classList.remove("active");

    // slider m color adjust karo 
    const min = inputSlider.min;
    const max = inputSlider.max; 
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/ (max-min) ) + "% 100%";
}
inputSlider.addEventListener("input",(e)=>{
        passwordLength = e.target.value;
        inputValue();
});

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)+min);

}
function generateLowerCase() {  
    return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {  
 return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbols(){
    let index = getRndInteger(0,symbols.length);
    return symbols.charAt(index);
}
function generateNumber(){
    return getRndInteger(0,9);
}

function handleCheckCount(){
    checkcount = 0;

    tick.forEach((input) =>{
        if(input.checked){
            checkcount++;
        }
    } )

    console.log(checkcount);
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function calcStrength() {
    console.log(inputSlider.value);
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (upperCase.checked) hasUpper = true;
    if (lowerCase.checked) hasLower = true;
    if (Numbers.checked) hasNum = true;
    if (Symbols.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && inputSlider.value >= 8) {
      setIndicator("#0f0");
    } 
    else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      inputSlider.value >= 6
    ) 
    {
      setIndicator("#ff0");
    } 
    else {
      setIndicator("#f00");
    }
}
tick.forEach((element) =>{
    element.addEventListener('change' ,handleCheckCount)
});


async function copyText(){
    try{
        await navigator.clipboard.writeText(password.innerText);
        copy.innerText ="Copied!"
       

    }
    catch(error){
        copy.innerText ="Failed!"
    }

    copy.classList.add("active");

    setTimeout(()=>{
        copy.classList.remove("active");
    },2000)

}
// console.log(password.innerText);
copybtn.addEventListener('click' ,()=>{
    if(password.innerText !== "PASSWORD"){
        copyText();
    }
});
finalBtn.addEventListener('click' , generatePassword);
function generatePassword(){
    let tempPass = ""
    passwordLength = inputSlider.value;
    if(checkcount == 0){
        return ;
    }

    if(passwordLength < checkcount){
        inputSlider.value  = checkcount;
        passwordLength = checkcount;
        inputValue();

    }

    let funcArr = [];


    if(upperCase.checked){
        funcArr.push(generateUpperCase);
    }

    if(lowerCase.checked){
        funcArr.push(generateLowerCase);
    }

    if(Numbers.checked){
        funcArr.push(generateNumber);
    }

    else{
        funcArr.push(generateSymbols);
    }



    //required dchracters addition

    for(let i = 0;i<funcArr.length;i++){
        tempPass += funcArr[i]();
    }

    // required added

    //add random characters

    let remains  = passwordLength - funcArr.length;

    for(let i = 0;i<remains;i++){

        let randomind = getRndInteger(0,funcArr.length);
        tempPass += funcArr[randomind]();

    }


    //temorary password is ready

    tempPass =  shufflePassword(Array.from(tempPass));

    password.innerText = tempPass;
    password.classList.add("active");

    calcStrength();

}

function shufflePassword(array){
    for(let i = array.length -1 ; i>0 ; i--){
        let j = Math.floor(Math.random() * (i+1));
        
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;


    }

    let str = "";

    array.forEach((ele) =>{
        str += ele;
    })

    return str;
}












