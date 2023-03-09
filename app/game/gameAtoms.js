import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const stageAtom = atom({
    number: 1,
    seconds: [1, 2, 4, 7, 11, 16]
})

export const gameStatusAtom = atom({
    gameOver: false,
    gameOutcome: '',
    finalScore: ''
})

export const statsAtom = atomWithStorage('stats', {
    totalScore: 0,
    highScore: 0,
    gamesPlayed: 0
})