document.addEventListener('DOMContentLoaded', () => {
  fetchQuestion()
})
let answer
function fetchQuestion() {
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
const trueModal = document.querySelector('#true-modal')
const falseModal = document.querySelector("#false-modal")
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
    trueModal.style.display = 'block'
  }else if (userAnswer !== answer){
    console.log("incorrect!")
    falseModal.style.display = 'block'
  }else{
    console.log("answer error!")
  }
  document.querySelector('#current-question').innerHTML = ''
  fetchQuestion()
}

document.getElementsByClassName("closeTrue")[0].addEventListener('click', () => {
  trueModal.style.display = 'none'
})

document.getElementsByClassName("closeFalse")[0].addEventListener('click', () => {
  falseModal.style.display = 'none'
})