/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** *make some changes/

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  const submitButton = document.querySelector("#btnSubmit");
  let timerInterval; // Declare the interval variable globally

  start.addEventListener("click", function () {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "Which planet is known as the Red Planet?",
      o: ["Venus", "Mars", "Jupiter", "Saturn"],
      a: 1, // Mars is the correct answer
    },
    {
      q: "What is the largest animal on Earth?",
      o: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
      a: 1, // Blue Whale is the correct answer
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
    });
    quizWrap.innerHTML = quizDisplay;
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    // Loop through each quiz question
    quizArray.forEach((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        let li = `li_${index}_${i}`; // List item (answer option) ID
        let r = `radio_${index}_${i}`; // Radio button (answer option) ID
        let liElement = document.querySelector(`#${li}`); // Get the li element
        let radioElement = document.querySelector(`#${r}`); // Get the radio button element

        // Highlight the correct answer
        if (quizItem.a === i) {
          liElement.style.backgroundColor = "lightgreen"; // Correct answer highlighted
        } else {
          liElement.style.backgroundColor = ""; // Reset background for wrong answers
        }

        // Check if the selected answer is correct
        if (radioElement.checked && quizItem.a === i) {
          score++; // Increment score for correct answer
        }
      }
    });

    // Display score
    document.querySelector("#score").textContent = `Your score is: ${score}`;
  };

  // Add event listener for Submit button
  document.querySelector("#btnSubmit").addEventListener("click", function () {
    calculateScore(); // Calculate and display the score
    document.querySelector("#btnSubmit").disabled = true; // Disable submit button
  });

  // Add event listener for Reset button
  document.querySelector("#btnReset").addEventListener("click", function () {
    window.location.reload(); // Reload the page to reset the quiz
  });

  // Timer functionality
  let timeLeft = 60; // 60 seconds countdown
  function startTimer() {
    timerInterval = setInterval(function () {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.querySelector(
        "#time"
      ).textContent = `Time Remaining: ${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval); // Stop the timer when it reaches 0
        calculateScore(); // Automatically submit the quiz when time runs out
        document.querySelector("#btnSubmit").disabled = true; // Disable submit button
      }
      timeLeft--;
    }, 1000);
  }

  // Start the timer when quiz is displayed
  startTimer();

  // call the displayQuiz function
  displayQuiz();
});
