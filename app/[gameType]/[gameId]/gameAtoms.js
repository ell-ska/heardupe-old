import { atomWithStorage } from 'jotai/utils'

export const statsAtom = atomWithStorage('stats', {
	totalScore: 0,
	highScore: 0,
	gamesPlayed: 0,
})
