'use client'
import { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify'
import useDebounce from '@/hooks/useDebounce'
import './search.css'
import '../css/components/input.css'

const Search = () => {
	const spotifyApi = useSpotify()

	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const [searchResults, setSearchResults] = useState([])

	const getSearch = async (query) => {
		try {
			const data = await spotifyApi.search(query, ['artist', 'playlist'])
			console.log(data.body)
			setSearchResults(data.body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!search) return setSearchResults([])
		getSearch(search)
	}, [debouncedSearch])

	return (
		<div className="search">
			<div className="search__inner">
				<form action="post" className="search__bar">
					<input
						type="text"
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search..."
					/>
				</form>
				<div className="search__results">
					{}
				</div>
			</div>
		</div>
	)
}

export default Search
