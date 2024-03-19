var candies=["blue","orange","green","yellow","red","purple"];
var board=[];
var rows=9;
var columns=9;
var score=0;
var dragStart,dragDrop,dragEnd,dragEnter,dragLeave,dragOver;
var curr;
var other;
window.onload=function(){
    startgame();
    //1/100th of a second
    window.setInterval(function(){
        crushcandy();
        slidecandy();
        generatecandy()
    },100)
}
function randomcandy(){
    return candies[Math.floor(Math.random()*candies.length)];

}
function startgame(){
    for(let i=0;i<rows;i++){
        let row=[];
        for(let j=0;j<columns;j++){
            //<img src="">
             let title=document.createElement("img");
             title.id=i.toString()+"-"+j.toString();
             title.src=randomcandy()+".png"; 
             //drag functionality
             title.addEventListener("dragstart",dragStart);//click on the candy intialize drag process
             title.addEventListener("dragover",dragOver);//clicking on candy ,moving mouse to drag the candy
             title.addEventListener("dragenter",dragEnter);//dragging candy on to another candy
             title.addEventListener("dragleave",dragLeave);//leave the candy over another candy
             title.addEventListener("drop",dragDrop);//dropping a candy over another candy
             title.addEventListener("dragend",dragEnd);//after drag process completed we swap candies

             document.getElementById("board").append(title);
             row.push(title);
        }
        
        board.push(row);
    }
    console.log(board);   
}
function dragStart(){
    //this refer to  title that was clicked on for dragging 
    curr=this;
}
function dragOver(e){
e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}
function dragLeave(e){

}
function dragDrop(){
    //thie refer to the target title that was dropped on
    other=this;
}
 function dragEnd(){
    if(curr.src.includes("blank")||other.src.includes("blank")){
        return;
    }
    //to avoid the drag the element in different place without any sequence
  let currcoords=curr.id.split("-");//id="0-0"->["0","0"]
    let r=parseInt(currcoords[0]);
    let c=parseInt(currcoords[1]);
let othercoords=other.id.split("-");
let r1=parseInt(othercoords[0]);
let c1=parseInt(othercoords[1]);
let moveleft=c1==c-1 && r==r1;
let moveright=c1==c+1 && r==r1;
let moveup=r1==r-1&&c==c1 ;
let movedown= r1==r+1 && c==c1;
let isAdjacet=movedown||moveleft||moveright||moveup;
if(isAdjacet){
    let currimg=curr.src;
    let otherimg=other.src;
    curr.src=otherimg;
    other.src=currimg;
    let validmove=checkvalid();
    if(!validmove){
        let currimg=curr.src;
        let otherimg=other.src;
        curr.src=otherimg;
        other.src=currimg;
    }

}
}
function crushcandy(){
    //curshfive()
    //crushfour()
    //crushthree()
    crushthree();
    document.getElementById("score").innerHTML=score;
}
function crushthree(){
    //check row
   for(let r=0;r<rows;r++){
    for(let c=0;c<columns-2;c++){
        let cad1=board[r][c];
        let cad2=board[r][c+1];
        let cad3=board[r][c+2];
        if(cad1.src==cad2.src && cad2.src==cad3.src && !cad1.src.includes("blank")){
            cad1.src="blank.png";
            cad2.src="blank.png";
            cad3.src="blank.png";
            score=score+30;
        }
    }
   }
   for(let c=0;c<columns;c++){
    for(let r=0;r<rows-2;r++){
        let cad1=board[r][c];
        let cad2=board[r+1][c];
        let cad3=board[r+2][c];
        if(cad1.src==cad2.src && cad2.src==cad3.src && !cad1.src.includes("blank")){
            cad1.src="blank.png";
            cad2.src="blank.png";
            cad3.src="blank.png";
            score=score+30;
        }
    }
   }
   
}
function checkvalid(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-2;c++){
            let cad1=board[r][c];
            let cad2=board[r][c+1];
            let cad3=board[r][c+2];
            if(cad1.src==cad2.src && cad2.src==cad3.src && !cad1.src.includes("blank")){
            return true;
            }
        }
       }
       for(let c=0;c<columns;c++){
        for(let r=0;r<rows-2;r++){
            let cad1=board[r][c];
            let cad2=board[r+1][c];
            let cad3=board[r+2][c];
            if(cad1.src==cad2.src && cad2.src==cad3.src && !cad1.src.includes("blank")){
                return true;
            }
        }
       }
       return false;
       
}
function slidecandy(){
for(let c=0;c<columns;c++){
    let ind=rows-1;
    for(let r=columns-1;r>=0;r--){
        if(!board[r][c].src.includes("blank")){
            board[ind][c].src=board[r][c].src;
            ind=ind-1;
        }
    }
    for(let r=ind;r>=0;r--){
        board[r][c].src="blank.png";
    }
}
}
function generatecandy(){
    for(let c=0;c<columns;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src=randomcandy()+".png";
        }
    }
}

