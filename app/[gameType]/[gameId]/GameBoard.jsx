'use client'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { statsAtom } from './gameAtoms'
import MusicPlayer from './MusicPlayer'
import { SkipButton, NextLevelButton } from './GameButtons'
import EndScreen from './EndScreen'
import gameOver from './gameOver'

const GameBoard = ({ playlist, tracks, type }) => {

    const [statistics, setStatistics] = useAtom(statsAtom)
    const [gameStatus, setGameStatus] = useState({
        levelEnded: false,
        levelOutcome: '',
        levelScore: '',
        gameEnded: false
    })

    const [level, setLevel] = useState(0)
    const currentSong = type === 'playlist' ? tracks[level].track : tracks[level]

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

    const resetGame = (type) => {
        guesses.map(guess => {
            guess.value = ''
            delete guess.skipped
        })

        setStage({
            ...stage,
            number: 1
        })

        setGameStatus({
            levelEnded: false,
            levelOutcome: '',
            levelScore: ''
        })

        if (type === 'level') {
            setLevel(0)
        }
    }

    const handleFinalScore = () => {
        setGameStatus({
            ...gameStatus,
            gameEnded: true
        })
    }

    const handleNextLevel = () => {
        if (gameStatus.levelEnded === false) {
            const [newStatus, newStatistics] = gameOver({ outcome: 'lost', currentScore, statistics })
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

                const [newStatus, newStatistics] = gameOver({ outcome: 'won', currentScore, statistics })
                setGameStatus(newStatus)
                setStatistics(newStatistics)

            } else {
    
                const currentGuess = guesses.find(guess => guess.number === stage.number)
                currentGuess.value = inputValue

                event.target.elements.guess.value = ''
                
                setGuesses([...guesses])

                if (stage.number >= 6) {
                    const [newStatus, newStatistics] = gameOver({ outcome: 'lost', currentScore, statistics })
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
                const [newStatus, newStatistics] = gameOver({ outcome: 'lost', currentScore, statistics })
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
                    {gameStatus.levelEnded || gameStatus.gameEnded ? 
                        <EndScreen
                            gameEnded={gameStatus.gameEnded}
                            playlist={playlist}
                            levelOutcome={gameStatus.levelOutcome}
                            seconds={stage.seconds[stage.number - 1]}
                            image={currentSong.album.images[0]}
                            title={currentSong.name}
                            name={currentSong.artists[0].name}
                            release={currentSong.album.release_date.slice(0, 4)}
                        /> : 
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
                    levelEnded={gameStatus.levelEnded}
                    gameEnded={gameStatus.gameEnded}
                    currentSongSpotifyLink={currentSong.external_urls.spotify}
                />
                {!gameStatus.gameEnded &&
                    <MusicPlayer
                        currentSongUrl={currentSong.preview_url}
                        stage={stage}
                        levelEnded={gameStatus.levelEnded}
                    />
                }
                <NextLevelButton
                    handleNextLevel={handleNextLevel}
                    level={level}
                    gameEnded={gameStatus.gameEnded}
                    handleFinalScore={handleFinalScore}
                    resetGame={resetGame}
                />
            </div>
        </>
    )
}

export default GameBoard