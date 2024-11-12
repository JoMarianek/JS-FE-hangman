'use strict'
import './style.css'

let QAndA = [
    {q:'A medical condition characterized by the abnormal increase of body temperature.', a: 'hyperthermia'},
    {q: 'A large celestial body that orbits a star.', a: 'planet'},
    {q: 'A building or outdoor area where plays, films, or performances are presented.', a: 'auditorium'},
    {q: 'A fear of open or crowded spaces.', a: 'agoraphobia'},
    {q: 'The process by which green plants use sunlight to synthesize food.', a: 'photosynthesis'},
]
// TODO: see about the functions i am calling in the DOM bit, maybe move them up or use stateSetter?
const { q: question, a: answer } = QAndA[Math.floor(Math.random() * QAndA.length)]
let currentAnswerArr = answer.split('')

let numberOfIncorrGuess = 0;
const maxGuesses = 6;

const abc = 'abcdefghijklmnopqrstuvwxyz'.split('')

let lettersPressedArr = [];

let flagIncorrGuess = true;
let checkIfSolved = true;

const wonMsg = 'Congratulations. You have won!';
const lostMsg = 'Sorry, you have lost.'

document.addEventListener('keydown', (event) => handleClick(event))

const wrapper = document.createElement('div')

wrapper.classList.add('wrapper')

function setState() {
    const {q: question, a: answer } = QAndA[Math.floor(Math.random() * QAndA.length)]
    currentAnswerArr = answer.split('')
    numberOfIncorrGuess = 0;
    lettersPressedArr = [];
    updateGuessCounter()
    updateGallowImages(images, numberOfIncorrGuess);
    renderUnderscores(currentAnswerArr)
    questionContainer.textContent = question
    virtualKeyboard.querySelectorAll('.letter').forEach(btn => btn.disabled = false)
}

function resetGame() {
    overlay.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    wrapper.remove()
    answerContainer.remove()
    answerContainer = document.createElement('div')
    answerContainer.classList.add('answercontainer')
    setState();
    word.appendChild(answerContainer)
    document.body.appendChild(wrapper)
}

function createKeyboard() {
    abc.forEach((item) => {
        let keyboardButton = document.createElement('button');
        keyboardButton.classList.add('letter')
        keyboardButton.textContent = item;
        virtualKeyboard.appendChild(keyboardButton);
        keyboardButton.addEventListener('click', (event) => handleClick(event))
    })
}

function handleClick(event) {
    renderGuesses(event)
    determineOutcome()
}

function renderGuesses(event) {
    answerContainer.remove()
    answerContainer = document.createElement('div')
    disableButtons(event)
    const guessedLetter = event.key || event.target.textContent;
    currentAnswerArr.forEach((item) => {
        const guessResult = document.createElement('span')
        guessResult.classList.add('underscore')
        if (guessedLetter === item) {
            guessResult.textContent = `${item}`
            lettersPressedArr.push(item)
            flagIncorrGuess = false
        }
        else if (lettersPressedArr.includes(item))
            guessResult.textContent = `${item}`
        else {
            guessResult.textContent = '_';
            checkIfSolved = false;
        }
        answerContainer.appendChild(guessResult)
    })
}

function determineOutcome() {
    if (flagIncorrGuess === true) {
        numberOfIncorrGuess += 1
        updateGuessCounter()
        updateGallowImages(images, numberOfIncorrGuess)// do i need to pass numberofincorr here since its a global var?
    }
    if (checkIfSolved === true) {
        gameFinished(true);
    }
    else if (numberOfIncorrGuess === maxGuesses) {
        gameFinished(false)
    }
    flagIncorrGuess = true;
    checkIfSolved= true;
    word.appendChild(answerContainer)
    answerContainer.classList.add('answercontainer')
}

function gameFinished(success) {
    modal.textContent = success ? 'Congratulations. You have won!' : 'Sorry, you have lost.'
    overlay.classList.toggle('hidden')
    modal.classList.toggle('hidden')
    
    const correctAnswer = document.createElement('div')
    correctAnswer.classList.add('modal-answer')
    correctAnswer.textContent = `The correct answer was: ${answer}`
    modal.appendChild(correctAnswer)

    const playAgainB = document.createElement('button')
    playAgainB.textContent = 'Play again'
    playAgainB.classList.add('play-again-button')
    modal.appendChild(playAgainB)
    playAgainB.onclick = () => resetGame();
}

function updateGallowImages(imageDom, imageNumber) {
    imageDom.src = `/hangman${imageNumber}.png`
}

function updateGuessCounter(){
    numberOfGuesses.textContent = `${numberOfIncorrGuess} / ${maxGuesses}`
}

function renderUnderscores(answer) {
    answer.forEach(() => {
        const underscore = document.createElement('span');
        underscore.textContent = '_';
        underscore.classList.add('underscore')
        answerContainer.appendChild(underscore);
    })
}

function disableButtons(event) {
    event.target.disabled = true 
    if (event.key) {
        virtualKeyboard.querySelectorAll('.letter').forEach(btn => {
            if (btn.textContent === event.key) {
                btn.disabled = true
            }
        })
    }
    
}

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

const questionContainer = document.createElement('h2')
questionContainer.textContent = question
riddle.appendChild(questionContainer)

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
