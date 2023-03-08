"use client"
import { useState } from "react"
import Image from "next/image"
import { useAtom } from "jotai"
import { gameOverAtom, stageAtom } from "./gameAtoms"

const GameBoard = ({ currentSongTitle, currentArtistName, currentArtistImage, currentSongReleaseDate }) => {
    // const [level, setLevel] = useState(1)
    const [stage, setStage] = useAtom(stageAtom)
    const stageSeconds = [1, 2, 4, 7, 11, 16]

    // add: score tracker
    // const [currentScore, setCurrentScore] = useState(0)
    // const [highScore, setHighScore] = useState(0)

    const [gameOver, setGameOver] = useAtom(gameOverAtom)

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
        }
    })

    // fix: no empty guess, no repeat guess
    // add: guess suggestions
    const compareGuess = (event) => {
        event.preventDefault()
        const inputValue = event.target.elements.guess.value

        if (stage < 6) {
            if (inputValue.toLowerCase() === currentSongTitle.toLowerCase()) {
                setGameOver(true)
            } else {
    
                const allGuesses = guesses
    
                const updatedGuess = allGuesses.find(guess => guess.number === stage)
                updatedGuess.value = inputValue
                
                setGuesses([...allGuesses])
                setStage(prev => prev + 1)
    
            }
        } else if (stage === 6) {
            const allGuesses = guesses
    
            const updatedGuess = allGuesses.find(guess => guess.number === stage)
            updatedGuess.value = inputValue
            
            setGuesses([...allGuesses])
            setGameOver(true)
        }
    }

    return (
        <div className="game">
            <div className="game__inner">
                {/* add: loser page */}
                {gameOver ? (
                    <div className="game-over">
                        <h3>Amazing!</h3>
                        <span>You got the song from {stageSeconds[stage - 1]}s seconds</span>
                        <Image src={currentArtistImage.url} width={currentArtistImage.width} height={currentArtistImage.height} alt={`image of ${currentArtistName}`}></Image>
                        <h4 className="game-over__song">{currentSongTitle}</h4>
                        <span className="game-over__artist">{currentArtistName}</span>
                        <span className="game-over__year">{currentSongReleaseDate.slice(0, 4)}</span>
                    </div>
                    ) : (
                    <>
                        <div className="game__score">
                            <div>Song: 1/10</div>
                            <div>Score: 0</div>
                            <div>High Score: 0</div>
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