'use client'
import { useEffect, useState } from 'react'
import useSpotify from '@/hooks/useSpotify'
import useDebounce from '@/hooks/useDebounce'
import PlaylistSection from '@/components/PlaylistSection'
import './search.css'
import '../css/components/input.css'

const Search = () => {
	const spotifyApi = useSpotify()

	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)
	const [searchResults, setSearchResults] = useState(null)

	const getSearch = async (query) => {
		try {
			const data = await spotifyApi.search(query, ['artist', 'playlist'])
			setSearchResults(data.body)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!search) return setSearchResults(null)
		getSearch(search)
	}, [debouncedSearch])

	return (
		<div className="search">
			<form action="post" className="search__bar">
				<input
					type="text"
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="Search..."
				/>
			</form>
			<div className="search__results">
				{searchResults && <PlaylistSection title='Artists' playlists={searchResults.artists.items} />}
				{searchResults && <PlaylistSection title='Playlists' playlists={searchResults.playlists.items} />}
			</div>
		</div>
	)
}

export default Search
