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
let numberCorrect = 0
let numberQuestions = 0
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
    let li = document.createElement('li')
    let btn = document.createElement('button')
    btn.id = 'delete-button'
    btn.innerText = '🗑️'
    btn.addEventListener('click', (e) => removeItem(e))
    li.innerText = `Question ${obj.questionID}`
    li.id = obj.questionID
    li.appendChild(btn)
    li.addEventListener('click', (e) => {
      questionList.forEach(question => {
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
    response = 'Correct!'
    numberQuestions++
    numberCorrect++
  }else if (userAnswer !== currentQuestionData.answer){
    response = 'Incorrect!'
    numberQuestions++
  }else{
    console.log('Error!')
  }
  updateCounter()
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

document.querySelector('#new-question').addEventListener('submit', (e) => {
  e.preventDefault()
  let childCount = document.querySelector('#question-list').childElementCount
  let newQuestion = e.target.querySelector('#question').value
  let newAnswer = e.target.querySelector('#answer').value
  let newId = childCount + 1
  let newObj = [{
    question: newQuestion,
    correct_answer: newAnswer,
    questionID: newId
  }]
  loadQuestions(newObj)
  persistQuestion(newObj)
  e.target.reset()
})

const updateCounter = () => {
  let counter = document.querySelector('#counter')
  counter.textContent = `${numberCorrect} Correct through ${numberQuestions} Question` + ((numberQuestions >1)?'s!':'!')
}

function removeItem(e){
  processDelete(e)
  e.target.parentNode.remove()
}

function persistQuestion(array){
  objToAdd = array[0];
  console.log(JSON.stringify(objToAdd))
  fetch("http://localhost:3000/results", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objToAdd)
  })
  .then(resp => resp.json())
  .then(data => console.log('SUCCESS ' + data))
  .catch((error) => console.log('ERROR ' + error))
}
let jsonId
function processDelete(e){
  idToRemove = e.target.parentNode.id
  findJSONId(idToRemove)
  fetch(`http://localhost:3000/results/${jsonId}`, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(data => console.log(`SUCCESS: ${data}`))
  .catch((error) => console.log(`ERROR: ${error}`))
}

function findJSONId(targetID){
  defaultQuestions.forEach(question => {
    if (question.questionID == targetID){
      jsonId = question.id
    }
  })
}