
let startGame;
function toggleDropdown() {
  let topNav = document.getElementById("myTopnav");
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}
window.addEventListener('load', function () {
  const answerBox = document.getElementById('answer');
  const buttons = document.querySelectorAll('button[class="button"]');
  const selectorDiv = document.getElementById('gameSelector');
  const mathDiv = document.getElementById('mathGame');
  const operation = document.getElementById('operation');
  const operationTitle = document.getElementById('operationTitle');
  const questionDiv = document.getElementById('question');
  const scoreBox = document.getElementById('score');
  let num1; let num2;
  let bigger; let smaller; let dividend;
  let timeout;
  let score = 0;
  // hide modal
  $("#resultModal").modal('hide');

  mathDiv.style.display = 'none';
  // display numbers in answer box
  function display(value) {
    answerBox.value += value;
  }
  // keep answer box focused
  function focus() {
    answerBox.focus();
  }
  function clear() {
    answerBox.value = '';
    focus();
  }
  //generate integer number between 1 and 20
  function generateNum() {
    return Math.floor(Math.random() * 10) + 1;
  }
  //display random number for math operation
  function mathOperation() {
    num1 = generateNum();
    num2 = generateNum();
    num1 > num2 ? bigger = num1 : bigger = num2;
    num1 < num2 ? smaller = num1 : smaller = num2;
    dividend = num1 * num2;
    switch (operation.value) {
      case ('add'):
        questionDiv.innerHTML = num1 + '+' + num2;
        break;
      case ('subtract'):
        questionDiv.innerHTML = bigger + '-' + smaller;
        break;
      case ('multiply'):
        questionDiv.innerHTML = num1 + 'x' + num2;
        break;
      case ('divide'):
        questionDiv.innerHTML = dividend + '	\xF7' + num1;
    }
  }
  // set timer countdown for 30 sec
  function countdown() {
    const resultModal = document.getElementById('resultModal');
    const finalScore = document.getElementById('finalScore');
    let seconds = 31;
    let countdown = setInterval(function () {
      seconds--;
      document.getElementById("time").textContent = seconds;
      if (seconds <= 0) {
        timeout = true;
        clearInterval(countdown);
        $("#resultModal").modal(); //display modal with game result
        finalScore.innerHTML = score;
        score = 0;
        operation.selectedIndex = "0";
      }
    }, 1000);
  }
  //check if answer is correct
  function checkAnswer(value) {
    let answer = answerBox.value;
    switch (operation.value) {
      case ('add'):
        if (parseInt(answer) == (num1 + num2) && timeout == false) {
          score++;
        }
        else {//does not show negative score
          if (score > 0)
            score--;
          else score = 0;
        }
        break;
      case ('subtract'):
        if (parseInt(answer) == (bigger - smaller) && timeout == false) {
          score++;
        }
        else {
          if (score > 0)
            score--;
          else score = 0;
        }
        break;
      case ('multiply'):
        if (parseInt(answer) == (num1 * num2) && timeout == false) {
          score++;
        }
        else {
          if (score > 0)
            score--;
          else score = 0;
        }
        break;
      case ('divide'):
        if (parseInt(answer) == (dividend / num1) && timeout == false) {
          score++;
        }
        else {
          if (score > 0)
            score--;
          else score = 0;
        }
    }
    scoreBox.innerHTML = score;
    if (timeout == false) {
      mathOperation();
      clear();
    }
  }
  // when Go button is clicked
  startGame = function () {
    selectorDiv.style.display = 'none';
    mathDiv.style.display = 'block';
    operationTitle.innerHTML = operation.options[operation.selectedIndex].text;
    timeout = false;
    scoreBox.innerHTML = score;
    focus();
    clear();
    mathOperation();
    countdown();
  }

  //check for correct answer
  let timer;
  answerBox.addEventListener('keyup', function (e) {
    clearTimeout(timer);
    timer = setTimeout(() => {//wait for 8ms so user be done typing
      checkAnswer(this.innerHTML)
    }, 800);

  });
  //clear answer box 
  const clearBtn = document.getElementById('clear');
  clearBtn.addEventListener('click', function () {
    clear();
  });
  //Add number to answer box by clicking number table
  for (button of buttons) {
    button.addEventListener('click', function () {
      display(this.innerHTML);
      clearTimeout(timer);
      timer = setTimeout(() => {//wait for 1s so user be done clicking
        checkAnswer(this.innerHTML)
      }, 1000);
    });
  }
  //display operation selector after play again button is clicked
  const playAgain = document.getElementById('playAgain');
  playAgain.addEventListener('click', function () {
    mathDiv.style.display = 'none';
    selectorDiv.style.display = 'block';
    $("#resultModal").modal('hide');
  });

});