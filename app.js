let btn = document.querySelector(".btn");

btn.addEventListener("click",playerNamesSet);

function playerNamesSet(){
    let play1 = document.getElementById("myForm").elements[0].value;
    console.log(play1);
    let play2 = document.getElementById("myForm").elements[1].value;
    let play1Text = document.body.querySelector(".p1name");
    let randsym1 = RandSymbol();
    let p1 = document.body.querySelector(".p1sym");
     p1.textContent = randsym1;
    let play2Text = document.body.querySelector(".p2name");
     let p2 = document.body.querySelector(".p2sym");
    if(randsym1 == "X"){
     p2.textContent = "O"
    }
    else{
      p2.textContent = "X"
    }
     
    play1Text.textContent = play1;
    play2Text.textContent = play2;
    let modalToDisp = document.body.querySelector(".modal");
    modalToDisp.style.display = "none"
    
    

    return {
        play1,
        play2
    }
}

 

 let gridCont = document.body.querySelector(".grid-cont")
let ArrToBeFilled;

window.addEventListener("load",  ArrToBeFilled = fillGrid());

// Fill grid fills the page with the layout when page loads.
  function fillGrid(){

let grid = 9;
 
let gridArr = [];
for(let i = 0; i < grid ; i++){
  const newDiv = document.createElement("div");
  newDiv.classList.add("gam-layout");
  newDiv.setAttribute("id",`${i}`);
  gridArr.push(newDiv);
  gridCont.appendChild(newDiv);
}
return gridArr;
}

 
 
function RandSymbol(){
 let sym = Math.floor(Math.random() * (1+1) + 0);
 if(sym == 0){
   return "X"
 }
 else{
   return "O"
 }
}

function check(rand){
  if(rand == "X"){
    return "O"
  }
  else{
    return "X"
  }
}


let randomSym = RandSymbol();
// Random values inside array that are to be replaced.
let ComparArr = [1,2,3,4,5,6,7,8,9];
function logicGame(arr){ 
ArrToBeFilled.forEach(function(e){
   
  

    e.addEventListener("click", function(ele){
      let oldVal;
      if(ele.target.textContent == ""){
        ComparArr[Number(ele.target.id)] = randomSym;
   ele.target.textContent = randomSym; 
    oldVal = randomSym;
    randomSym = check(randomSym);
      }
      else{
        ele.stopPropagation();
      }

      if((ComparArr[0] == ComparArr[1] && ComparArr[0]== ComparArr[2]) || (ComparArr[2] == ComparArr[5] && ComparArr[2] == ComparArr[8]) || (ComparArr[6] == ComparArr[7] && ComparArr[6] == ComparArr[8]) || (ComparArr[0] == ComparArr[3] && ComparArr[0] == ComparArr[6]) || (ComparArr[1] == ComparArr[4] && ComparArr[1] == ComparArr[7]) || (ComparArr[3] == ComparArr[4] && ComparArr[3] == ComparArr[5]) || (ComparArr[0] == ComparArr[4] && ComparArr[0] == ComparArr[8]) || (ComparArr[2] == ComparArr[4] && ComparArr[2] == ComparArr[6])){
        
         const Res = document.body.querySelector(".Result");
         Res.textContent = `${oldVal} wins the game, click on the reset button to start again`;
          
         gridCont.classList.add("avoid-point")
         const reset = document.body.querySelector(".reset");
         
          reset.addEventListener("click",function(){
           ArrToBeFilled =   rst(gridCont,Res);
           ComparArr = [1,2,3,4,5,6,7,8,9];
           logicGame(ArrToBeFilled);
      
          })
         


      }
      console.log(typeof(ComparArr[0]));
    })
    
})
}

logicGame(ArrToBeFilled);

function rst(gridToRst,result){
    gridToRst.innerHTML = "";
    gridToRst.classList.remove("avoid-point");
     result.textContent = "";
      ArrFill = "";
     
    ArrFill = fillGrid();
    return ArrFill;

}

