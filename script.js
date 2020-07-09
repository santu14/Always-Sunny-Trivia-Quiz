$(document).ready(function () {

    var questions = ["poopoo?", "peeppe?", "both?"];

    var answers = {
        set1: ["yes", "no", "maybe", "leave me alone"],
        set2: ["maybe", "eww gross", "yeehaw", "yes chef!"],
        set3: ["omg how u knowww", "how could you", "yeah i deeed datt", "shhhhh"]
    };
    //  var answers = [
         
    //      {set: ["yes", "no", "maybe", "leave me alone"]},
    //      {set: ["maybe", "eww gross", "yeehaw", "yes chef!"]},
    //      {set: ["omg how u knowww", "how could you", "yeah i deeed datt", "shhhhh"]}
    //  ];
   

    var display = $("#display");

    var correctAnswer = ["yes", "yeehaw",];

    var x = 0;
    var y =0;
    var score = 0;

    $(".start-btn").on("click", function () {
        questionGenerator(questions, answers.set1, correctAnswer);
    });
    
    function questionGenerator(question, answer, correct) {
        
        display.empty();
        display.append("<h1>").text(question[x]);
        display.append("<br>");
        display.append("<hr>");

        x++;
        console.log(x);

        for (i = 0; i < answer.length; i++) {
            var btn = $("<button>").addClass("btn answer-button");
            btn.text(answer[i]);
            display.append(btn);
            display.append("<br>");
        }
        $(".answer-button").on("click", function () {
            console.log(this.innerHTML);

    
            if (this.innerHTML === correct[0] ||
                this.innerHTML === correct[1] ||
                this.innerHTML === correct[2]) {
    
                $("#response").append("<hr>");
                $("#response").append("<h3>").text("correct!");
                score += 10;
            } else {
                $("#response").prepend("<br> <hr> <h3>").text("wrong!");
            }
    
        });
        return x;
    };

    function nextQuestion (){
        
    }

});
