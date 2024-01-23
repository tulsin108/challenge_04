// script.js 

let questions = [ 
	{ 
		prompt: `True or False. JavaScript is case sensitive?`, 
		options: [ 
			"True", 
			"False", 
		], 
		answer: "True", 
	}, 

	{ 
		prompt: `How do you call a 
				function named
				myFunction?`, 
		options: [ 
			"call myFunction()", 
			"myFunction()", 
			"call function myFunction", 
			"Call.myFunction", 
		], 
		answer: "myFunction()", 
	}, 

	{ 
		prompt: `Which of the following JavaScript 
    variables should be used if
    the value should not be changed?`, 
		options: [ 
			"var", 
			"let", 
			"const", 
			"==", 
		], 
		answer: "const", 
	}, 

	{ 
		prompt: `Fill in the blank.
    In JavaScript, a _______ 
    is used to separate
    statements?`, 
		options: ["|", "&&", "%", ";"], 
		answer: ";", 
	}, 

	{ 
		prompt: `In JavaScript, which 
    operator returns the division
    remainder?`, 
		options: [ 
			"%", 
			"**", 
			"/", 
			"++", 
		], 
		answer: "%", 
	}, 

  { 
		prompt: `True or False?
    If a number and a string are added
    in JavaScript, the number is treated
    as a string.`, 
		options: [ 
			"True", 
			"False", 
		], 
		answer: "True", 
	},

  { 
		prompt: `Which of the following
    can function names contain
    in JavaScript?`, 
		options: [ 
			"hyphens", 
			"underscores",
      "parantheses",
      "percentage signs", 
		], 
		answer: "underscores", 
	},

  { 
		prompt: `True or False?
    When a function
    comes to a return 
    statement, the function 
    will stop executing.`, 
		options: [ 
			"True", 
			"False",
		], 
		answer: "True", 
	},

  { 
		prompt: `In general, what does 
    a for loop do?`, 
		options: [ 
			"Executes the same block of code multiple times", 
			"Calculates a specific date.",
      "Performs a comparison.",
      "Creates text.",
		], 
		answer: "Executes the same block of code multiple times", 
	},

  { 
		prompt: `True or False?
    If text is located between // 
    it will be ignored 
    by JavaScript.`, 
		options: [ 
			"True", 
			"False",
		], 
		answer: "True", 
	},

]; 

// Get Dom Elements 

let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

// Quiz's initial state 
let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 

// Start quiz and hide frontpage 

function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

// Loop through array of questions and 
// Answers and create list with buttons 
function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 

// Check for right answers and deduct 
// Time for wrong answer, go to next question 

function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 20; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 

// End quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 

// End quiz if timer reaches 0 

function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 

// Save score in local storage 
// Along with users' name 

function saveHighscore() { 
	let name = nameEl.value.trim(); 
	if (name !== "") { 
		let highscores = 
			JSON.parse( 
				window.localStorage.getItem( 
					"highscores"
				) 
			) || []; 
		let newScore = { 
			score: time, 
			name: name, 
		}; 
		highscores.push(newScore); 
		window.localStorage.setItem( 
			"highscores", 
			JSON.stringify(highscores) 
		); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 

// Save users' score after pressing enter 

function checkForEnter(event) { 
	if (event.key === "Enter") { 
		saveHighscore(); 
		alert( 
			"Your Score has been Submitted"
		); 
	} 
} 
nameEl.onkeyup = checkForEnter; 

// Save users' score after clicking submit 

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;
