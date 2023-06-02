import { forwardRef, useEffect, useState } from 'react'
import SearchDropdown from './SearchDropdown'

const Search = forwardRef(function Search({ search, setSearch, searchResults, handleSearchInputChange, handleNextStage }, ref) {
    
    // hover replace focus
    // input reflect focus text
    
    const [focusedOption, setFocusedOption] = useState(0)
    const optionsLimit = 5 - 1

    // prevent default på sök
    // clean input efter enter

    const autoComplete = (index, initial) => {

        const { name, artists } = searchResults[index]
        const completedGuess = `${name} - ${artists.map(artist => artist.name).join(', ')}`
        // const completedGuess = name

        if (!initial) {    
            ref.current.value = completedGuess
            return
        }

        if (initial) {
            const currentInput = ref.current.value
            const currentInputLength = currentInput.length
            const slicedGuess = completedGuess.slice(0, currentInputLength)

            if (currentInput.toLowerCase() === slicedGuess.toLowerCase()) {
                ref.current.value = completedGuess
                ref.current.setSelectionRange(currentInputLength, completedGuess.length)
            } else {
                // dont focus on the first
            }

        }

    }

    const handleKeyDown = (event) => {
        let index

        if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (focusedOption <= 0) {
                index = optionsLimit
            } else {
                index = focusedOption - 1
            }
            setFocusedOption(index)
            autoComplete(index)
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (focusedOption >= optionsLimit) {
                index = 0
            } else {
                index = focusedOption + 1
            }
            setFocusedOption(index)
            autoComplete(index)
        }

        if (event.key === 'Enter') {
            const { name, id } = searchResults[focusedOption]
            handleNextStage({ type: 'guess', event, name, id })
            setFocusedOption(0)
        }
    }

    useEffect(() => {
        if (!searchResults) return
        autoComplete(0, true)
    }, [searchResults])

    const handleOnChange = (event) => {
        handleSearchInputChange(event)
        setFocusedOption(0)
    }

    return (
        <form
            className='game__guesser'
            autoComplete='off'
        >
            <input
                ref={ref}
                // value={search}
                onChange={event => handleOnChange(event)}
                onKeyDown={e => handleKeyDown(e)}
                type="text"
                name="guess"
                placeholder='Guess the song title'
            />
            {searchResults && <SearchDropdown
                searchResults={searchResults}
                handleNextStage={handleNextStage}
                focusedOption={focusedOption}
            />}
        </form>
    )
})

export default Search