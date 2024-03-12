var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChooseColour = $(this).attr("id");
    userClickedPattern.push(userChooseColour);
    playSound(userChooseColour);
    animatePress(userChooseColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 1000);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
    
}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColor = buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);

    $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChooseColor);

};

function playSound(name) {
    var playAudio = new Audio('sounds/' + name + '.mp3');
    playAudio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level =0;
    gamePattern=[];
    started=false;
}