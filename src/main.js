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

const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

let lettersPressed = [];

let flagIncorrGuess = true;
let flagSuccess = true;

const wonMsg = 'Congratulations. You have won!';
const lostMsg = 'Sorry, you have lost.'

const wrapper = document.createElement('div')

wrapper.classList.add('wrapper')

function setState() {
    index = Math.floor(Math.random() * lastIndex)
    currentQA = QAndA[index]
    currentQ = currentQA.question
    currentA = currentQA.answer
    currentAnswerArr = currentA.split('')
    numberOfIncorrGuess = 0;
    lettersPressed = [];
    updateGuessCounter()
    updateGallowImages(images, numberOfIncorrGuess);
    renderUnderscores(currentAnswerArr)
    question.textContent = currentQ
}

function resetGame({overlay, modal, word}) {
    overlay.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    wrapper.remove()
    answerContainer.remove()
    answerContainer = document.createElement('div')
    answerContainer.classList.add('answercontainer')
    setState();
    word.appendChild(answerContainer)
    document.body.appendChild(wrapper)
} //so i need to pass arguments here because its two layers?

function renderModal(outcomeMsg) {
    modal.textContent = `${outcomeMsg}`
    overlay.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    
    const correctAnswer = document.createElement('div')
    correctAnswer.classList.add('modal-answer')
    correctAnswer.textContent = `The correct answer was: ${currentA}`
    modal.appendChild(correctAnswer)

    const playAgainB = document.createElement('button')
    playAgainB.textContent = 'Play again'
    playAgainB.classList.add('play-again-button')
    modal.appendChild(playAgainB)
    playAgainB.onclick = () => resetGame(domObj);
}

function updateGallowImages(imageDom, imageNumber) {
    imageDom.src = `/hangman${imageNumber}.png`
}

function renderUnderscores(answer) {
    answer.forEach(() => {
        const underscore = document.createElement('span');
        underscore.textContent = '_';
        underscore.classList.add('underscore')
        answerContainer.appendChild(underscore); //how is this not throwing an error, because asnwercontainer doesnt exist here yet?
    })
}

function updateGuessCounter(){
    numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`
}

function renderGuesses(event) {
    currentAnswerArr.map((item) => {
        const guessResult = document.createElement('span'); // isnt underscore shadowing?
        guessResult.classList.add('underscore')
        if (event.target.textContent === item || event.key === item) {
            guessResult.textContent = `${item}`
            lettersPressed.push(item)
            flagIncorrGuess = false
        }
        else if (lettersPressed.includes(item))
            guessResult.textContent = `${item}`
        else {
            guessResult.textContent = '_';
            flagSuccess = false;
        }
        answerContainer.appendChild(guessResult)
    })
}

function determineOutcome(event) {
    answerContainer.remove()
    answerContainer = document.createElement('div')
    renderGuesses(event);
    if (flagIncorrGuess === true) {
        numberOfIncorrGuess += 1
        updateGuessCounter()
        updateGallowImages(images, numberOfIncorrGuess)
    }
    if (flagSuccess === true) {
        renderModal(wonMsg);
    }
    else if (numberOfIncorrGuess === 6) {
        renderModal(lostMsg)
    }
    
    flagIncorrGuess = true;
    flagSuccess= true;
    word.appendChild(answerContainer)
    answerContainer.classList.add('answercontainer')
}

function createKeyboard() {
    abc.forEach((item) => {
        let keyboardButton = document.createElement('button');
        keyboardButton.textContent = item;
        virtualKeyboard.appendChild(keyboardButton);
        keyboardButton.onclick = determineOutcome;
    })
}

//transform everything into a obj pass as props and move functions up to top of document
document.body.appendChild(wrapper)

const overlay = document.createElement('div')
overlay.classList.add('overlay', 'hidden')
document.body.appendChild(overlay)

const modal = document.createElement('div')
modal.classList.add('modal', 'hidden')
wrapper.appendChild(modal)

const gallows = document.createElement('div')
gallows.classList.add('gallows')
wrapper.appendChild(gallows)

const images = document.createElement('img')
images.alt = 'Image of gallow'
updateGallowImages(images, numberOfIncorrGuess);
gallows.appendChild(images)

const title = document.createElement('h1')
title.textContent = 'HANGMAN GAME'
gallows.appendChild(title)

const riddle = document.createElement('div')
riddle.classList.add('riddle')
wrapper.appendChild(riddle)

const word = document.createElement('div')
word.classList.add('word')

const domObj = {overlay, modal, word}

riddle.appendChild(word)

let answerContainer = document.createElement('div')
answerContainer.classList.add('answercontainer')
word.appendChild(answerContainer)

renderUnderscores(currentAnswerArr);

const question = document.createElement('h2')
question.textContent = currentQ
riddle.appendChild(question)

const guessCounter = document.createElement('p')
guessCounter.textContent = 'Incorrect guesses: '

const numberOfGuesses = document.createElement('span')

updateGuessCounter()

riddle.appendChild(guessCounter)
guessCounter.appendChild(numberOfGuesses)

const virtualKeyboard = document.createElement('div')
virtualKeyboard.classList.add('keyboard')

riddle.appendChild(virtualKeyboard)

createKeyboard()

document.addEventListener('keydown', determineOutcome)
