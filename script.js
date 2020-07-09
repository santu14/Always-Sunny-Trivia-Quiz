$(document).ready(function () {

    var questions = ["poopoo?", "peeppe?", "both?"];
    var answers = [

        { set: ["yes", "no", "maybe", "leave me alone"] },
        { set: ["maybe", "eww gross", "yeehaw", "yes chef!"] },
        { set: ["omg how u knowww", "how could you", "yeah i deeed datt", "shhhhh"] }
    ];
    var correctAnswer = ["yes", "yeehaw", "shhhhh"];


    var display = $("#display");
    var feedback = $("#feedback");

    var x = 0;
    var y = 0;
    var score = 0;
    var gameEnd;

    var timeLeft = 75;
    var timer = $("#timer");
    timer.text(timeLeft);
    
    function countdown() {

        var countdownTimer  = setInterval(function(){
            if (!gameEnd){
                timeLeft--;
                timer.text(timeLeft);
            } else {
                clearInterval(countdownTimer);
            };
        }, 1000);
        timer.text(timeLeft);
    };



    $(".start-btn").on("click", function () {
        gameEnd = false;
        nextQuestion();
        countdown();
    });



    function questionGenerator(question) {

        display.empty();
        display.append("<h1>").text(question);
        display.append("<br>");
        display.append("<hr>");
        x++;
        console.log(x);

    };




    function buttonGenerator(answer, correct) {

        feedback.animate({ opacity: "0.00" },1000);

        for (i = 0; i < answer.length; i++) {
            var btn = $("<button>").addClass("btn answer-button");
            btn.text(answer[i]);
            display.append(btn);
            display.append("<br>");
        }
        $(".answer-button").on("click", function () {
            console.log(this.innerHTML);

            feedback.css({ opacity: "1" });

            if (this.innerHTML === correct[0] ||
                this.innerHTML === correct[1] ||
                this.innerHTML === correct[2]) {
                    
                score += 10;
                feedback.append("<hr>");
                feedback.append("<h3>").text("correct!");
                
                nextQuestion()
            } else {
                timeLeft -= 10;
                timer.text(timeLeft)
                feedback.prepend("<br> <hr> <h3>").text("wrong!");
                nextQuestion();
            }
        });
        
        y++;
    }

    function nextQuestion() {
        if (x >= questions.length){
        score += timeLeft;
        endGame();
        
 
        }else {
            questionGenerator(questions[x]);
            buttonGenerator(answers[y].set, correctAnswer);
        }
        console.log(score);
    }

    function endGame (){
        display.empty();
        gameEnd = true;
        display.append("<h1>").text("das it boi you scored " + score + " points");

    }

});
