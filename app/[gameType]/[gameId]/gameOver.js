const gameOver = ({ outcome, currentScore, statistics }) => {
	const newGameStatus = {
		levelEnded: true,
		levelOutcome: outcome,
		levelScore: currentScore,
	}

	const newGameStats = {
		totalScore: statistics.totalScore + currentScore,
		highScore: currentScore >= statistics.highScore ? currentScore : statistics.highScore,
		gamesPlayed: statistics.gamesPlayed + 1,
	}

	return [newGameStatus, newGameStats]
}

export default gameOver
