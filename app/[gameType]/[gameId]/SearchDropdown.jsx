const SearchDropdownItem = ({
	id,
	name,
	artists,
	handleNextStage,
	isFocused,
}) => {
	const className = isFocused
		? 'search-results__song search-results__song--active'
		: 'search-results__song'

	return (
		<li>
			<button
				className={className}
				onClick={(event) =>
					handleNextStage({ type: 'guess', id, event, name, artists })
				}
			>
				{name} - {artists.map((artist) => artist.name).join(', ')}
			</button>
		</li>
	)
}

const SearchDropdown = ({ searchResults, handleNextStage, focusedOption }) => {
	return (
		<ul className="search-results">
			{searchResults.map((searchResult, index) => (
				<SearchDropdownItem
					key={searchResult.id}
					{...searchResult}
					handleNextStage={handleNextStage}
					isFocused={focusedOption === index}
				/>
			))}
		</ul>
	)
}

export default SearchDropdown
