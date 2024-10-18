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

let index = Math.floor(Math.random() * lastIndex)

let currentQA = QAndA[index]
let currentQ = currentQA.question
let currentA = currentQA.answer
let currentAnswerArr = currentA.split('')

let numberOfIncorrGuess = 0;

const maxGuesses = 6;

let flagIncorrGuess = true;
let flagSuccess = true;

const wonMsg = 'Congratulations. You have won!';
const lostMsg = 'Sorry, you have lost.'

const wrapper = document.createElement('div')
wrapper.classList.add('wrapper')
document.body.appendChild(wrapper)

function renderModal(outcomeMsg) {
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    document.body.appendChild(overlay)
    const modal = document.createElement('div')
    modal.textContent = `${outcomeMsg}`
    modal.classList.add('modal')
    // modal.classList.add('hidden') i think i need to add this as for second play thorugh the toggle will unhide ti on second play again button click
    wrapper.appendChild(modal)
    const correctAnswer = document.createElement('div')
    correctAnswer.classList.add('modal-answer')
    correctAnswer.textContent = `The correct answer was: ${currentA}`
    modal.appendChild(correctAnswer)

    const playAgainB = document.createElement('button')
    playAgainB.textContent = 'Play again'
    playAgainB.classList.add('play-again-button')
    modal.appendChild(playAgainB)
    playAgainB.onclick = function(event) {
        overlay.classList.toggle('hidden')
        modal.classList.toggle('hidden')
        wrapper.remove()
        answerContainer.remove()
        answerContainer = document.createElement('div')
        setState();
        word.appendChild(answerContainer)
        document.body.appendChild(wrapper)
    }
}

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
        underscore.classList.add('underscore')
        if (event.target.textContent === item) {
            underscore.textContent = `${event.target.textContent}`
            eventArray.push(item)
            flagIncorrGuess = false
        }
        else if (event.key === item) {
            underscore.textContent = `${event.key}`
            eventArray.push(item)
            flagIncorrGuess = false
        }
        else if (eventArray.includes(item))
            underscore.textContent = `${item}`
        else {
            underscore.textContent = '_';
            flagSuccess = false;
        }
        answerContainer.appendChild(underscore)
    })
    if (flagIncorrGuess === true) {
        numberOfIncorrGuess += 1
        numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`
        images.src = `/hangman${numberOfIncorrGuess}.png`
        if(numberOfIncorrGuess === 6) {
            renderModal(lostMsg)
        }
    }
    if (flagSuccess === true) {
        renderModal(wonMsg);
    }
    // if (numberOfIncorrGuess === 6) {
    //     renderModal(lostMsg)
    // }
    
    flagIncorrGuess = true;
    flagSuccess= true;
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

// set a flag and when there are no underscores, render success messgae
// so when underscore set flag to false and only when flag true,
// success modal
// if incorr Guesses >6 OR all letters filled, show modal text content
// you've lost. the correct word was currentA. OR you've won. the correct...
// Play again button
// how to check if all letters filled? store success, fail in vars and conditonally adapt
// message of modal
// if (numberOfIncorrGuess > maxGuesses || end of game) {
//       modal.classList.
// }

function setState() {
    index = Math.floor(Math.random() * lastIndex)
    currentQA = QAndA[index]
    currentQ = currentQA.question
    currentA = currentQA.answer
    currentAnswerArr = currentA.split('')
    numberOfIncorrGuess = 0;
    numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`
    images.src = `/hangman${numberOfIncorrGuess}.png`
    renderAnswer(currentAnswerArr)
    question.textContent = currentQ
}

// setState();