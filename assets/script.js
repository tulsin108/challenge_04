const questions = [
    // Add your questions and answer choices here in an array format
    {
      question: "What is the data type of 'true'?",
      choices: ["String", "Boolean", "Number", "Function"],
      answer: 1
    },
    {
      question: "How do you declare a variable in JavaScript?",
      choices: ["var", "let", "const", "All of the above"],
      answer: 2
    },
    // ... Add more questions ...
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer = 60; // Change this to your desired quiz duration in seconds
  
  const timerElement = document.getElementById("timer");
  const questionContainer = document.getElementById("question-container");
  const resultsElement = document.getElementById("results");
  const finalScoreElement = document.getElementById("final-score");
  
  const startQuiz = () => {
    // Start timer
    const interval = setInterval(() => {
      timer--;
      timerElement.textContent = `Time remaining: ${timer} seconds`;
      if (timer === 0) {
        clearInterval(interval);
        endQuiz();
      }
    }, 1000);
  
    // Show the first question
    showQuestion(currentQuestion);
  };
  
  const showQuestion = (index) => {
    questionContainer.innerHTML = "";
    const question = questions[index];
    const questionElement = document.createElement("p");
    questionElement.textContent = question.question;
    questionContainer.appendChild(questionElement);
  
    for (let i = 0; i < question.choices.length; i++) {
      const choiceElement = document.createElement("button");
      choiceElement.textContent = question.choices[i];
      choiceElement.addEventListener("click", () => checkAnswer(i, index));
      questionContainer.appendChild(choiceElement);
    }
  };
  
  const checkAnswer = (choice, index) => {
    if (choice === questions[index].answer) {
      score++;
    } else {
      timer -= 5; // Penalize time for incorrect answer
    }
  
    if (index === questions.length - 1) {
      endQuiz();
    } else {
      currentQuestion++;
      showQuestion(currentQuestion);
    }
  };
  
  const endQuiz = () => {
    questionContainer.innerHTML = "";
    timerElement.textContent = "";
    resultsElement.style.display = "block";
    finalScoreElement.textContent = `You scored ${score} out of ${questions.length}!`;
  };
  
  const restartQuiz = () => {
    currentQuestion = 0;
    score = 0
  