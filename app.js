let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newGameBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")// for printing winning message

//first we have to track which player turn, means we have to give alternate turns
let turnO = true; // first is the turn of player O

let counter = document.querySelector("#count");
let count = 0;


//store winning patterns using multidimensional 2D array 
let winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];


//to perform action when each box was clicked
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        msg.innerText = "";
        console.log("box was clicked");
        count++;
        //for printing value of count
        counter.innerText=`${count}`;

        if(turnO===true){
            box.innerText = "O";
            box.classList.add("o"); //for adding diffent color
            turnO=false;
        }
        else{
            box.innerText = "X";
            box.classList.add("x"); //for adding diffent color
            turnO=true;
        }

        //now after accessing each box we need to disable box so that no more inputs could be done so we write
        box.disabled=true;

        //then after each box implementation we will check for winner so we pass the value in checkWinner function
        checkWinner();

        //every time we will check for draw if inner message is empty moreover count is equal to 9, then we can say its a draw
        if(count===9  &&  msg.innerText==""){
            console.log("its a draw");
            draw();

            //making count 0 again
            count = 0;
            //for printing value of count
            counter.innerText=`${count}`;
        }
    
    })
})

//winner check function
let checkWinner = () => {
    for(let pattern of winpatterns){ 
        /* console.log("pattern is :",pattern[0], pattern[1], pattern[2]);
        console.log("pattern is :",boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]); */ //for seeing how boxes are accessing according to the winpatterns
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        //now we before moving further for checking winpatterns we have to analyze that the position must not be empty, means the position must be filled to check for winning condition therefore:-
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            // so if the positions are not empty we will check for patterns with winpatterns therefore:-
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner", pos1Val);
                //msg.innerText=`${pos1Val} is the Winner🏆`;

                //new function to show winner
                showWinner(pos1Val);
            }
        }

    }

}



//draw condition
let draw = () => {
    msg.innerText = "Oops! its a draw";
    msgContainer.classList.remove("hide");
    

    //now remove resetBtn
    resetBtn.classList.add("hide");
}



//showWinner function
let showWinner = (winner) => {
    msg.innerText = `congratulations! Winner is ${winner}🏆`;
    msgContainer.classList.remove("hide");
    
    //now we should disable all the boxes
    disableBoxes();

    //now remove resetBtn
    resetBtn.classList.add("hide");
}



//function for resetting games
let resetGame = () => {
    turnO = true;

    //to enable boxes during new game
    enableBoxes();
    // to hide winning msg
    msgContainer.classList.add("hide");

    //now add resetBtn
    resetBtn.classList.remove("hide");

    //making msg empty again
    msg.innerText = "";

    //making count 0 again
    count=0;
    //for printing value of count
    counter.innerText=`${count}`;
}

//reset game button using the function resetGame
resetBtn.addEventListener("click", resetGame);


//new game button using the function resetGame
newGameBtn.addEventListener("click", resetGame);


//to disable all boxes after we got a winner we make a function
let disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//enable boxes function so that when new game has to be played or reset has to be done
let enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("o", "x"); // remove the different color class while reseting game or on a new game
    }
}

 