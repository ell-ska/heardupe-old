'use client'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { statsAtom } from './gameAtoms'
import MusicPlayer from './MusicPlayer'
import { SkipButton, NextLevelButton } from './GameButtons'
import WinnerScreen from './WinnerScreen'
import gameOver from './gameOver'

const GameBoard = ({ playlist, type }) => {

    const [statistics, setStatistics] = useAtom(statsAtom)
    const [gameStatus, setGameStatus] = useState({
        gameOver: false,
        gameOutcome: '',
        finalScore: ''
    })

    const [level, setLevel] = useState(0)
    const currentSong = type === 'playlist' ? playlist[level].track : playlist[level]

    const [stage, setStage] = useState({
        number: 1,
        seconds: [1, 2, 4, 7, 11, 16]
    })

    const score = [600, 500, 400, 300, 200, 100]
    const currentScore = score[stage.number - 1]

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

    // FIX: "hard" reset when leaving a game (reset levels)
    const resetGame = () => {
        guesses.map(guess => {
            guess.value = ''
            delete guess.skipped
        })

        setStage({
            ...stage,
            number: 1
        })

        setGameStatus({
            gameOver: false,
            gameOutcome: '',
            finalScore: ''
        })
    }

    const handleFinalScore = () => {
        console.log('final')
    }

    const handleNextLevel = () => {
        if (gameStatus.gameOver === false) {
            const [newStatus, newStatistics] = gameOver('lost', currentScore, statistics)
            setGameStatus(newStatus)
            setStatistics(newStatistics)
        } else {
            setLevel(prev => prev + 1)
            resetGame()
        }
    }

    const handleNextStage = (type, event) => {

        if (type === 'guess') {
            event.preventDefault()

            let inputValue = event.target.elements.guess.value

            if (inputValue.length === 0) {
                return
            }

            if (inputValue.toLowerCase() === currentSong.name.toLowerCase()) {

                const [newStatus, newStatistics] = gameOver('won', currentScore, statistics)
                setGameStatus(newStatus)
                setStatistics(newStatistics)

            } else {
    
                const currentGuess = guesses.find(guess => guess.number === stage.number)
                currentGuess.value = inputValue

                event.target.elements.guess.value = ''
                
                setGuesses([...guesses])

                if (stage.number >= 6) {
                    const [newStatus, newStatistics] = gameOver('lost', currentScore, statistics)
                    setGameStatus(newStatus)
                    setStatistics(newStatistics)
                }

                const newStage = stage.number + 1
                setStage({
                    ...stage,
                    number: newStage
                })
            }
        }

        if (type === 'skipped') {

            const currentGuess = guesses.find(guess => guess.number === stage.number)
            currentGuess.value = 'Skipped'
            currentGuess.skipped = true

            if (stage.number >= 6) {
                const [newStatus, newStatistics] = gameOver('lost', currentScore, statistics)
                setGameStatus(newStatus)
                setStatistics(newStatistics)
            }

            const newStage = stage.number + 1
            setStage({
                ...stage,
                number: newStage,
            })
        }
    }

    return (
        <>
            <div className="game">
                <div className="game__inner">
                    {gameStatus.gameOver ? 
                        <WinnerScreen
                            outcome={gameStatus.gameOutcome}
                            seconds={stage.seconds[stage.number - 1]}
                            image={currentSong.album.images[0]}
                            title={currentSong.name}
                            name={currentSong.artists[0].name}
                            release={currentSong.album.release_date.slice(0, 4)}
                        ></WinnerScreen> : 
                        <>
                            <div className="game__score">
                                <div>Song: {level + 1}/10</div>
                                <div>Score: {currentScore}</div>
                                <div>High Score: {statistics.highScore}</div>
                            </div>
                            <form className='game__guesser' action="" autoComplete='off' onSubmit={e => handleNextStage('guess', e)}>
                                <input type="text" name="guess" placeholder='Guess the song title'/>
                            </form>
                            <div className="game__guesses">
                                {guesses.map(({ number, value, skipped }) => <div key={number}>{number}. <span style={skipped ? {color: 'var(--color-primary-500)'} : null}>{value}</span></div>)}
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="game-footer">
                <SkipButton
                    stage={stage}
                    handleNextStage={handleNextStage}
                    gameOver={gameStatus.gameOver}
                    currentSongSpotifyLink={currentSong.external_urls.spotify}
                />
                <MusicPlayer
                    currentSongUrl={currentSong.preview_url}
                    stage={stage}
                    gameOver={gameStatus.gameOver}
                />
                <NextLevelButton
                    handleNextLevel={handleNextLevel}
                    level={level}
                    handleFinalScore={handleFinalScore}
                />
            </div>
        </>
    )
}

export default GameBoard