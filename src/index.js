//test
document.addEventListener('DOMContentLoaded', () => {
  fetchQuestions()
})
let userAnswer
let defaultQuestions = []
let currentQuestionData = {
  question: "",
  answer: "",
  questionID: ""
}
const fetchQuestions = () => {
  fetch("http://localhost:3000/results")
  .then(resp => resp.json())
  .then(questions => {
    questions.forEach(question => {
      defaultQuestions.push(question)
    })
    loadQuestions(defaultQuestions)
  }) 
}

function loadQuestions(questionList) {
  questionList.forEach(obj => {
    console.log(obj.question)
    let li = document.createElement('li')
    li.innerText = `Question ${obj.questionID}`
    li.id = obj.questionID
    li.addEventListener('click', (e) => {
      defaultQuestions.forEach(question => {
        if (e.target.id == question.questionID){
          currentQuestionData.question = question.question
          currentQuestionData.answer = question.correct_answer
          currentQuestionData.questionID = question.questionID
          loadQuestion(question.question)
        }
      })
    })
    document.querySelector('#question-list').appendChild(li)
  })
}

function loadQuestion(question){
  document.querySelector('#current-question').innerHTML = ''
  let h2 = document.createElement('h2')
  h2.id = "current"
  h2.innerText = question
  document.querySelector('#current-question').appendChild(h2)
}

document.querySelector('#random').addEventListener('click', () => {
  getRandomQuestion()
})

function getRandomQuestion() {
  fetch("https://opentdb.com/api.php?amount=1&difficulty=easy&type=boolean")
  .then(resp => resp.json())
  .then(data => {
    let randomQuestion = data.results[0].question
    let correctAnswer = data.results[0].correct_answer
    currentQuestionData.question = randomQuestion
    currentQuestionData.answer = correctAnswer
    loadQuestion(randomQuestion)
  })
}
document.querySelector('#answer-select #true').addEventListener('click', (e) => {
  userAnswer = e.target.innerText
  getResult()
})
document.querySelector('#answer-select #false').addEventListener('click', (e) => {
  userAnswer = e.target.innerText
  getResult()
})

function getResult() {
  let response
  if (userAnswer === currentQuestionData.answer){
    console.log('Correct!')
    response = 'Correct!'
  }else if (userAnswer !== currentQuestionData.answer){
    console.log('Incorrect!')
    response = 'Incorrect!'
  }else{
    console.log('Error!')
  }
  handleAnswer(response)
}

function handleAnswer(response){
  let modalContainer = document.querySelector('#modalContainer')
  let modal = document.querySelector('#modal')
  let h1 = document.createElement('h1')
  h1.id = 'feedback'
  h1.textContent = response
  let p = document.querySelector('#directions')
  modal.insertBefore(h1, p)
  modalContainer.classList.add('show')
}

document.querySelector('#close').addEventListener('click', () => {
  let h1 = document.querySelector('#feedback')
  h1.remove()
  document.querySelector('#modalContainer').classList.remove('show')
})