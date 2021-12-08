document.addEventListener('DOMContentLoaded', () => {
  fetchQuestions()
})
let answer
function randomQuestion() {
  fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=boolean")
  .then(resp => resp.json())
  .then(data => {
    let question = data.results[0].question
    answer = data.results[0].correct_answer
    let h2 = document.createElement('h2')
    h2.textContent = question
    document.querySelector('#current-question').append(h2)
  })
}

let userAnswer

document.querySelector('button.true').addEventListener('click', (e) => {
  console.log(e.target.innerText)
  userAnswer = e.target.innerText
  getResults(userAnswer)
})

document.querySelector('button.false').addEventListener('click', (e) => {
  console.log(e.target.innerText)
  userAnswer = e.target.innerText
  getResults(userAnswer)
})

function getResults(userAnswer){
  if (userAnswer == answer){
    console.log("correct!")
  }else if (userAnswer !== answer){
    console.log("incorrect!")
  }else{
    console.log("answer error!")
  }
}

document.querySelector('#new-question').addEventListener('submit', (e) => {
  e.preventDefault()
})