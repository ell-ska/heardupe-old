"use client"
import { useState } from "react"
import { useAtom } from "jotai"
import { stageAtom, gameStatusAtom } from "./gameAtoms"
import WinnerScreen from './WinnerScreen'

const GameBoard = ({ currentSongTitle, currentArtistName, currentSongImage, currentSongReleaseDate }) => {
    // const [level, setLevel] = useState(1)
    const [stage, setStage] = useAtom(stageAtom)
    const stageSeconds = [1, 2, 4, 7, 11, 16]

    // add: score tracker
    // const [currentScore, setCurrentScore] = useState(0)
    const score = [600, 500, 400, 300, 200, 100]
    const currentScore = score[stage - 1]
    // const [highScore, setHighScore] = useState(0)

    const [gameStatus, setGameStatus] = useAtom(gameStatusAtom)

    const [guesses, setGuesses] = useState([
        {
            number: 1,
            value: ''
        }, {
            number: 2,
            value: ''
        }, {
            number: 3,
            value: ''
        }, {
            number: 4,
            value: ''
        }, {
            number: 5,
            value: ''
        }, {
            number: 6,
            value: ''
        }
    ])

    guesses.forEach(guess => {
        if (guess.number < stage && guess.value.length === 0) {
            guess.value = 'Skipped'
            guess.skipped = true
        }
    })

    const gameOver = (outcome) => {
        const newGameStatus = {
            gameOver: true,
            gameOutcome: outcome
        }

        setGameStatus(newGameStatus)
    }

    // DONE: no empty guess
    // DONE: no repeat guess
    // DONE: empty input after guess
    // DONE: style skipped guesses
    // ADD: styling on invalid guess
    // ADD: guess suggestions
    const compareGuess = (event) => {
        event.preventDefault()
        console.log(gameStatus)

        let inputValue = event.target.elements.guess.value
        let validGuess = true

        if (inputValue.length === 0) {
            validGuess = false
        }

        guesses.map(guess => {
            if (guess.value === inputValue) {
                validGuess = false
            }
        })

        if (stage < 6 && validGuess) {

            if (inputValue.toLowerCase() === currentSongTitle.toLowerCase()) {
                gameOver('won')
            } else {
    
                const allGuesses = guesses
    
                const updatedGuess = allGuesses.find(guess => guess.number === stage)
                updatedGuess.value = inputValue

                event.target.elements.guess.value = ''
                
                setGuesses([...allGuesses])
                setStage(prev => prev + 1)
    
            }

        } else if (stage >= 6 && validGuess) {
            const allGuesses = guesses
    
            const updatedGuess = allGuesses.find(guess => guess.number === stage)
            updatedGuess.value = inputValue
            
            setGuesses([...allGuesses])
            gameOver('lost')
        }
    }

    return (
        <div className="game">
            <div className="game__inner">
                {gameStatus.gameOver ? 
                    <WinnerScreen
                        outcome={gameStatus.gameOutcome}
                        seconds={stageSeconds[stage - 1]}
                        image={currentSongImage}
                        title={currentSongTitle}
                        name={currentArtistName}
                        release={currentSongReleaseDate.slice(0, 4)}
                    ></WinnerScreen> : 
                    <>
                        <div className="game__score">
                            <div>Song: 1/10</div>
                            <div>Score: {currentScore}</div>
                            <div>High Score: 0</div>
                        </div>
                        <form className='game__guesser' action="" onSubmit={(e) => compareGuess(e)}>
                            <input type="text" name="guess" placeholder='Guess the song title'/>
                        </form>
                        <div className="game__guesses">
                            {guesses.map(({ number, value, skipped }) => <div key={number}>{number}. <span style={skipped ? {color: 'var(--color-primary-500)'} : null}>{value}</span></div>)}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default GameBoard