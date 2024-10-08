'use strict'
import './style.css'

let QAndA = [
    {question:'A medical condition characterized by the abnormal increase of body temperature.', answer: 'Hyperthermia'},
    {question: 'A large celestial body that orbits a star.', answer: 'Planet'},
    {question: 'A building or outdoor area where plays, films, or performances are presented.', answer: 'Auditorium'},
    {question: 'A fear of open or crowded spaces.', answer: 'Agoraphobia'},
    {question: 'The process by which green plants use sunlight to synthesize food.', answer: 'Photosynthesis'},
]

const lastIndex = QAndA.length;
const index = Math.floor(Math.random() * lastIndex)

const currentQA = QAndA[index]
const currentQ = currentQA.question
const currentA = currentQA.answer
const currentAnswerArr = currentA.split('')

const maxGuesses = 6;
let numberOfIncorrGuess = 0;

const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
document.body.appendChild(wrapper)

const gallows = document.createElement('div')
gallows.classList.add('gallows')
wrapper.appendChild(gallows)

const images = document.createElement('img')
images.src = `/hangman${numberOfIncorrGuess}.png`
images.alt = 'Image of gallow'
gallows.appendChild(images)


const title = document.createElement('h1')
title.textContent = 'HANGMAN GAME'
gallows.appendChild(title)

const riddle = document.createElement('div')
riddle.classList.add('riddle')

wrapper.appendChild(riddle)


const word = document.createElement('div')
word.classList.add('word')

riddle.appendChild(word)

function renderAnswer(answer) {
    riddle.removeChild(word)
    answer.forEach((item) => {
        const underscores = document.createElement('span');
        underscores.textContent = '_';
        underscores.classList.add('underscores')
        word.appendChild(underscores);
    })
    riddle.appendChild(word)
}
renderAnswer(currentAnswerArr);

const question = document.createElement('h2')
question.textContent = currentQ
riddle.appendChild(question)

const guessCounter = document.createElement('p')
guessCounter.textContent = 'Incorrect guesses: '

const numberOfGuesses = document.createElement('span')
numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`

riddle.appendChild(guessCounter)
guessCounter.appendChild(numberOfGuesses)

const virtualKeyboard = document.createElement('div')
virtualKeyboard.classList.add('keyboard')

riddle.appendChild(virtualKeyboard)

const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

abc.forEach((item) => {
    let keyboardButton = document.createElement('button');
    keyboardButton.textContent = item;
    virtualKeyboard.appendChild(keyboardButton);
});

document.addEventListener('keydown', function(event) {
    const updatedAnswer = currentAnswerArr.map((item) => {
        if (event.key === item)
            item = event.key; 
    })
    renderAnswer(updatedAnswer)
})
