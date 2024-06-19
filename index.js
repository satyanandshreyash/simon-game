var btnColors = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress",function(){
    if(!started){
        nextSequence()
        started = true;
    }
});

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random()*4);
    var randomChosenColor = btnColors[randomNum];
    gamePattern.push(randomChosenColor);
    var idString = "#" + randomChosenColor;
    $(idString).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level "+level);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over! Press any key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}


