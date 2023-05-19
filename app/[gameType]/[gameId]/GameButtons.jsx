import Link from 'next/link'

const SkipButton = ({ stage, handleNextStage, gameOver, currentSongSpotifyLink }) => {
    return (
        <>
            {gameOver ? (
                <Link href={currentSongSpotifyLink} target='_blank' rel="noopener noreferrer">
                    <button className="button">Listen on Spotify</button>
                </Link>
            ) : (
                <button
                    className="button"
                    onClick={() => handleNextStage('skipped')}
                >Skip {stage.number < 6 ? `(+${stage.number}s)` : null}</button>
            )}
        </>
    )
}

const NextLevelButton = ({ handleNextLevel, level, handleFinalScore }) => {

    const finalScore = <button className="button button--outline" onClick={handleFinalScore}>Final score</button>
    const nextSong = <button className="button button--outline" onClick={handleNextLevel}>Next song</button>

    return (
        level >= 9 ? finalScore : nextSong
    )
}

export { SkipButton, NextLevelButton }