const gameOver = (outcome, score, stats) => {
    
    const newGameStatus = {
        gameOver: true,
        gameOutcome: outcome,
        finalScore: score
    }

    const newGameStats = {
        totalScore: stats.totalScore + score,
        highScore: score >= stats.highScore ? score : stats.highScore,
        gamesPlayed: stats.gamesPlayed + 1
    }

    return [newGameStatus, newGameStats]
}

export default gameOver