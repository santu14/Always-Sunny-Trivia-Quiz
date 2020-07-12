$(document).ready(function () {

    var questions = [
        "In the episode 'Underage Drinking: A National Concern', what was the plan to protect the new underage patrons of Paddy's pub?",
        "Which 'Sunny' character does Dennis hit with his car, halting the gang's trip to the strip club?",
        "Who does Charlie first tell he has cancer?",
        "Which one of the characters is not in season one?",
        "What type of community service are Dennis, Mac, and Dee assigned to after throwing the bag of burning poo at the building next door?",
        "What is the alias that Dennis comes up with for Charlie, when he and Mac are entering him into the underground fight tournament?"
    ];
    var choices = [
        { set: ["No tequila", "No liquor", "3 drink maximum", "12pm curfew"] },
        { set: ["Charlie", "Dee", "Mac", "Rickety Cricket"] },
        { set: ["Dennis", "Dee", "Mac", "Frank"] },
        { set: ["Carmen", "Liam McPoyle", "frank", "Artemis"] },
        { set: ["coaching youth basketball", "Blood Drive", "Neighborhood Watch", "Volunteer at a soup kitchen"] },
        { set: ["Baby Boy", "Clown Face", "Baby Face", "Clown Baby"] }
    ];

    var correctAnswer = [
        "3 drink maximum",
        "Charlie",
        "Dennis",
        "frank",
        "coaching youth basketball",
        "Clown Babay"
    ];


    var display = $("#display");
    var feedback = $("#feedback");
    var cardText = $(".card-text");

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
            if (timeLeft <= 0) {
                clearInterval(countdownTimer);
                renderFinalScene();
            }
        }, 1000);
        

    };
    
    


    $(".start-btn").on("click", function () {
        gameEnd = false;
        nextQuestion();
        countdown();
    });



    function renderQuestions(question) {
        display.empty();

        cardText.text(question);
        display.append("<br>");
        display.append("<hr>");
        x++;

    };


    function buttonGenerator(answer) {
        for (i = 0; i < answer.length; i++) {
            var btn = $("<button>").addClass("btn btn-dark btn-lg btn-block answer-button");
            btn.text(answer[i]);
            
            display.append(btn);
           


        }
        buttonLogic(correctAnswer[y]);
        y++;
    };

    function buttonLogic(correct) {

        $(".answer-button").on("click", function () {
            console.log(this.innerHTML);
            feedback.stop();
            feedback.css({ opacity: "1" });

            if (this.innerHTML === correct)
                {

                currentScore += 10;
                feedback.append("<hr>");
                feedback.append("<h3>").text("correct!");
                feedback.append("<br><iframe src='https://giphy.com/embed/3oKIPbWfx4F4rFbDgI' width='350' height='auto' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>");
                
                feedback.animate({ opacity: "0.00" }, 5000);
                
                nextQuestion()
            } else {
                timeLeft -= 10;
                timer.text(timeLeft)
                feedback.prepend("<hr> <h3>").text("wrong!");
                feedback.append("<br><iframe src='https://giphy.com/embed/jTqnyfhLvq9GfKZ43g' width='350' height='auto' frameBorder='0' class='giphy-embed' allowFullScreen></iframe>");
                nextQuestion();
                feedback.animate({ opacity: "0.00" }, 5000);

            }
        });
    };

    function nextQuestion() {

        if (x >= questions.length) {
            currentScore += timeLeft;
            renderFinalScene();

        } else {
            renderQuestions(questions[x]);
            buttonGenerator(choices[y].set);
        }
        console.log(currentScore);
    };

    function renderFinalScene() {
        gameEnd = true;
        display.empty();
        timer.empty();
        cardText.text("You Scored: " + currentScore + " points!");
        display.append("<form>").attr("id", "high-score-input");

        var form = $("#high-score-input");
        form.append("<input type='text' id='initials' pattern='[A-Z]{3}' onkeyup='this.value = this.value.toUpperCase();'>");
        form.append("<input type='submit' id='submit-btn'>");
        submitHighScore();
        
    };

    
    function submitHighScore() {
        
        $("#submit-btn").on("click", function () {
            var currentInitials = $("#initials").val();
            console.log(currentInitials);
           

            if (currentInitials.length > 3 || currentInitials.length === 0){
                
                alert("You must enter up to 3 letters");
                return;
            } else {
                
                var items = {};
                items.initials = currentInitials;
                items.score = currentScore;
                
                highScores.push(items);
                
                console.log(highScores);
                storeHigScores();
                $("#high-score-input").empty();
                $("#high-score-input").append("<h5>thank you!")

            }
        });
        
    };

    
    function storeHigScores(){
        localStorage.setItem("highScores", JSON.stringify(highScores));
    };
    

    function renderHighScores (){
        var storedHigScores = JSON.parse(localStorage.getItem("highScores"));
        var num = 1;
        if (storedHigScores !== null){
            
            highScores = storedHigScores;
            for (i = 0; i < highScores.length; i++){
                var newRow = $("<tr>");
                newRow.append($("<td>").text([num]));
                newRow.append($("<td>").text(highScores[i].initials));
                newRow.append($("<td>").text(highScores[i].score));
                $("tbody").append(newRow);
                num++;
            };
        };
    };

    renderHighScores ();
    console.log(highScores);
});
