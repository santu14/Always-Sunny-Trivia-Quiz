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
    var currentScore = 0;
    var gameEnd;

    var highScores = [
        // {initials: []},
        // {scores: []}
    ];

    var timeLeft = 75;
    var timer = $("#timer");
    timer.text(timeLeft);

    function countdown() {

        var countdownTimer = setInterval(function () {
            if (!gameEnd) {
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



    function renderQuestions(question) {

        display.empty();
        display.append("<h1>").text(question);
        display.append("<br>");
        display.append("<hr>");
        x++;

    };


    function buttonGenerator(answer) {

        

        for (i = 0; i < answer.length; i++) {
            var btn = $("<button>").addClass("btn answer-button");
            btn.text(answer[i]);
            display.append(btn);
            display.append("<br>");
        }
        buttonLogic(correctAnswer);
        y++;
    };

    function buttonLogic( correct) {

        $(".answer-button").on("click", function () {
            console.log(this.innerHTML);
            feedback.stop();
            feedback.css({ opacity: "1" });

            if (this.innerHTML === correct[0] ||
                this.innerHTML === correct[1] ||
                this.innerHTML === correct[2]) {

                currentScore += 10;
                feedback.append("<hr>");
                feedback.append("<h3>").text("correct!");

                nextQuestion()
            } else {
                timeLeft -= 10;
                timer.text(timeLeft)
                feedback.prepend("<br> <hr> <h3>").text("wrong!");
                nextQuestion();
            }
            feedback.animate({ opacity: "0.00" }, 1050);
        });
    };

    function nextQuestion() {
        

        if (x >= questions.length) {
            currentScore += timeLeft;
            renderFinalScene();


        } else {
            renderQuestions(questions[x]);
            buttonGenerator(answers[y].set);
        }
        console.log(currentScore);
    };

    function renderFinalScene() {

        gameEnd = true;
        display.empty();

        display.append("<h1>").text("das it boi you scored " + currentScore + " points");
        display.append("<form>").attr("id", "high-score-input");
        var form = $("#high-score-input");
        form.append("<input type='text' id='initials'>");
        form.append("<input type='submit' id='submit-btn'>");
        saveHighScore();
    };

    function saveHighScore() {

        $("#submit-btn").on("click", function () {
            var items = {};
            var currentInitials = $("#initials").val();

            items.initials = currentInitials;
            items.score = currentScore;

            highScores.push(items);

            console.log(highScores);

        });

    };

});
