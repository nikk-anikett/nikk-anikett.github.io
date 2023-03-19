
var randomNumber1=Math.floor(Math.random() * 6 + 1);

var diceImages1="dice"+ randomNumber1 +".png";

var randomIS="images/" + diceImages1;

var image1 = document.querySelectorAll("img")[0];

image1.setAttribute("src",randomIS); 

var randomNumber2=Math.floor(Math.random() * 6) + 1;

var randomIS2="images/dice"+ randomNumber2 + ".png";

var image2 = document.querySelectorAll("img")[1];

image2.setAttribute("src",randomIS2);

if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML="player 1 win";
}else if(randomNumber1<randomNumber2){
    document.querySelector("h1").innerHTML="player 2 win";
}else{
    document.querySelector("h1").innerHTML="game Dies";
}