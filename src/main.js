'use strict'
import './style.css'

let QAndA = [
    {question:'A medical condition characterized by the abnormal increase of body temperature.', answer: 'hyperthermia'},
    {question: 'A large celestial body that orbits a star.', answer: 'planet'},
    {question: 'A building or outdoor area where plays, films, or performances are presented.', answer: 'auditorium'},
    {question: 'A fear of open or crowded spaces.', answer: 'agoraphobia'},
    {question: 'The process by which green plants use sunlight to synthesize food.', answer: 'photosynthesis'},
]

const lastIndex = QAndA.length;
const index = Math.floor(Math.random() * lastIndex)

const currentQA = QAndA[index]
const currentQ = currentQA.question
const currentA = currentQA.answer
const currentAnswerArr = currentA.split('')

const maxGuesses = 6;
let numberOfIncorrGuess = 0;
let flag = 1;

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

let answerContainer = document.createElement('div')
word.appendChild(answerContainer)

function renderAnswer(answer) {
    answer.forEach((item) => {
        const underscore = document.createElement('span');
        underscore.textContent = '_';
        underscore.classList.add('underscore')
        answerContainer.appendChild(underscore);
    })
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

function keyboard(event) {
    answerContainer.remove()
    answerContainer = document.createElement('div')
    currentAnswerArr.map((item) => {
        const underscore = document.createElement('span');
        underscore.textContent = '_';
        underscore.classList.add('underscore')
        console.log("before character check:", item);
        if (event.target.textContent === item) {
            underscore.textContent = `${event.target.textContent}`
            eventArray.push(item)
            flag = 0
        }
        else if (event.key === item) {
            underscore.textContent = `${event.key}`
            eventArray.push(item)
            flag = 0
        }
        else if (eventArray.includes(item))
            underscore.textContent = `${item}`
        answerContainer.appendChild(underscore)
    })
    if (flag === 1) {
        numberOfIncorrGuess += 1
        numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`
        images.src = `/hangman${numberOfIncorrGuess}.png`
    }
    flag = 1;
    console.log('end of function flag:', flag)
    word.appendChild(answerContainer)
}

abc.forEach((item) => {
    let keyboardButton = document.createElement('button');
    keyboardButton.textContent = item;
    virtualKeyboard.appendChild(keyboardButton);
    keyboardButton.onclick = keyboard;
});

const eventArray = []
document.addEventListener('keydown', keyboard)