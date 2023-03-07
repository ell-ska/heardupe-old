"use client"
import { useState } from "react"
import Image from "next/image"
import { useAtom } from "jotai"
import { stageAtom } from "./gameAtoms"
import placeholder from "../../public/placeholder.jpg"

const GameBoard = ({ currentSongTitle }) => {
    const [level, setLevel] = useState(1)
    const [stage, setStage] = useAtom(stageAtom)

    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

    const [gameOver, setGameOver] = useState(false)

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

    // !!! site breaks on guess 5?

    if (stage >= 6) {
        setGameOver(true)
    }

    guesses.forEach(guess => {
        if (guess.number < stage && guess.value.length === 0) {
            guess.value = 'Skipped'
        }
    })

    // fix: no empty guess, no repeat guess
    // add: guess suggestions
    const compareGuess = (event) => {
        event.preventDefault()
        const inputValue = event.target.elements.guess.value

        if (inputValue.toLowerCase() === currentSongTitle.toLowerCase()) {
            setGameOver(true)
        } else {

            const allGuesses = guesses

            const updatedGuess = allGuesses.find(guess => guess.number === stage)
            updatedGuess.value = inputValue
            
            setGuesses([...allGuesses])
            setStage(prev => prev + 1)

        }
    }

    return (
        <div className="game">
            <div className="game__inner">
                {gameOver ? (
                    <div className="game-over">
                        <h3>Amazing!</h3>
                        <span>You got the song from 4 seconds</span>
                        <Image src={placeholder} alt="image of artist"></Image>
                        <h4 className="game-over__song">Liz</h4>
                        <span className="game-over__artist">Remi Wolf</span>
                        <span className="game-over__year">2021</span>
                    </div>
                    ) : (
                    <>
                        <div className="game__score">
                            <div>Song: {level}/10</div>
                            <div>Score: {currentScore}</div>
                            <div>High Score: {highScore}</div>
                        </div>
                        <form className='game__guesser' action="" onSubmit={(e) => compareGuess(e)}>
                            <input type="text" name="guess" placeholder='Guess the song title'/>
                        </form>
                        <div className="game__guesses">
                            {guesses.map(({ number, value }) => <div key={number}>{number}. {value}</div>)}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default GameBoard