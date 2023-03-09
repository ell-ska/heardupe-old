import { atom } from 'jotai'

export const stageAtom = atom(1)
export const gameStatusAtom = atom({
    gameOver: false,
    gameOutcome: ''
})