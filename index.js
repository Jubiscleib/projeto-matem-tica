const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Qual é o conjunto que contém todos os números inteiros positivos?",
    answers: [
      { text: "Z", correct: false },
      { text: "Q", correct: false },
      { text: "N", correct: true },
      { text: "R", correct: false }
    ]
  },
  {
    question: "Qual conjunto inclui todos os números reais, incluindo decimais e frações?",
    answers: [
      { text: "R", correct: true },
      { text: "N", correct: false },
      { text: "Z", correct: false },
      { text: "Q", correct: false }
    ]
  },
  {
    question: 'Qual é o conjunto que consiste em todos os números inteiros, positivos, negativos e zero?',
    answers: [
      { text: "Z", correct: true },
      { text: "Q", correct: false },
      { text: "R", correct: false },
      { text: "N", correct: false }
    ]
  },
  {
    question: 'O conjunto de números racionais inclui apenas os números que podem ser expressos como frações, onde o numerador e o denominador são inteiros e o denominador é diferente de zero.',
    answers: [
      { text: "Falso", correct: false },
      { text: "Verdadeiro", correct: true }
    ]
  },
  {
    question: 'Qual conjunto representa todos os números inteiros e seus opostos?',
    answers: [
      { text: "N", correct: false },
      { text: "Z", correct: true },
      { text: "Q", correct: false },
      { text: "R", correct: false }
    ]
  },
  {
    question: 'Qual conjunto inclui todos os números racionais e irracionais?',
    answers: [
      { text: "N", correct: false },
      { text: "R", correct: true },
      { text: "Z", correct: false },
      { text: "Q", correct: false }
    ]
  },
  {
    question: 'Qual é o conjunto que contém todos os números naturais e zero?',
    answers: [
      { text: "N", correct: false },
      { text: "Q", correct: false },
      { text: "R", correct: false },
      { text: "Z", correct: true },
    ]
  },
]