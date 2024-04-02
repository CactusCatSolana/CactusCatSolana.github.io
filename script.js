/*question.js*/

/*constructor function*/
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

/*create another function that selects the above constructor function*/

Question.prototype.correctAnswer = function(choice) {
  return choice === this.answer;
}

/*quiz controller, containing the scores and the number of questions*/

/*constructor function*/

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

/*this is to get the index of the current question that the user is on*/
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

/*checking if the quiz has ended checking if the current question the user is on is equal to the question index length*/
Quiz.prototype.isEnded = function() {
  return this.questions.length === this.questionIndex;
}

/*this is to check if the current answer is equal to the one selected by the user
at the start it also allows the question index to increment and then we check the question index and the .correctanswer prototype and we pass the parameter of the users answer in there to check, if its matching then we increment the score and the question index, the question index being incremented will allow the quiz to move to the scores page at the end as we set this up above with the isended prototype function 
*/

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

/*next part to populate the questions
here we are sending three parameters to the question thing we did at the start, we have the text the choices and then the answer, simple really
*/

function populate() {
  /*so first check if quiz has ended, if not then follow the else statement and populate the divs with the quiz stuff*/
  if(quiz.isEnded()) {
    showScores();
    
  } else {
    //show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;
    
    //show choices 
    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i< choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      /*here we are going to add the navigation to the next page of questions with guess*/
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
};

/*this shows the progress at the bottom of the quiz*/
function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

/*to show the score at the end we just create some html and then replace what is already on the page with what we have created we do this using variables document get element by id and then using innerhtml on those variables.*/
function showScores() {
  if(quiz.score <= 4) {
  var gameOverHtml = "<h1>Terrible Result</h1>"
  gameOverHtml += "<h2 id='score'> You scored: " + quiz.score + " out of " + quiz.questions.length + "<br>" + "YOU HAVE NO RESPEC FOR CAT, YOU HAVE TO BUY CACTUS CAT NO QUESTIONS</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
  } else if(quiz.score <= 9) {
    var gameOverHtml = "<h1>Average Result</h1>"
     gameOverHtml += "<h2 id='score'> You scored: " + quiz.score + " out of " + quiz.questions.length + "<br>" + "Not Bad! You still have to buy cactus cat though!</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
  } else {
    var gameOverHtml = "<h1>Brilliant Result</h1>"
     gameOverHtml += "<h2 id='score'> You scored: " + quiz.score + " out of " + quiz.questions.length + "<br>" + "Wow...are you a cat like me? meow</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
    
  }
}

var questions = [
  new Question("How many different species of cat are there?", ["50", "25", "43", "36"], "36"),
  new Question("what does it mean when a cats tail is up?", ["she's quite annoyed", "she's confused", "she's happy", "she is curious"], "she's happy"),
  new Question("why do cats meow?", ["to talk to each other", "to get attention", "cuz they be stupid", "nobody knows"], "to get attention"),
  new Question("which is the best animal?", ["cat", "dog", "pig", "bushbaby"], "pig"),
  new Question("how many lives do cats have?", ["9", "1", "7", "6"], "1"),
   new Question("what do cats like most?", ["human hands", "hunting", "food", "cucumbers"], "food"),
   new Question("why do cats spray", ["cuz they like it", "communication", "reproduction", "defense"], "communication"),
   new Question("how far can cats generally fall and survive?", ["3 stories", "7.6 stories", "5.5 stories", "20 stories"], "5.5 stories"),
   new Question("why are cats associated with witches?", ["their nocturnal nature", "accused witches talked to cats", "they caught mice for their potions", "cuz they evil"], "their nocturnal nature"),
   new Question("how long have humans known cats?", ["4000 years", "2121 years", "5500 years", "1325 years"], "5500 years"),
];

/*creating an object for the quiz controller*/
var quiz = new Quiz(questions);

populate();