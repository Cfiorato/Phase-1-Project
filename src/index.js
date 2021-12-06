document.addEventListener('DOMContentLoaded', () => {
  fetchQuestion()
})
let answer
function fetchQuestion() {
  fetch("https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=boolean")
  .then(resp => resp.json())
  .then(data => {
    let question = data.results[0].question
    let answer = data.results[0].correct_answer
    let h2 = document.createElement('h2')
    h2.textContent = question
    document.querySelector('#current-question').append(h2)
  })
}