import SpotifyWebApi from 'spotify-web-api-node'
// https://github.com/thelinmichael/spotify-web-api-node

// https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scopes = [
	'playlist-read-private',
	'playlist-read-collaborative',
	'user-follow-read',
	'user-read-email',
	'user-top-read',
	'user-read-recently-played',
	'user-read-private',
	'user-library-read',
].join(',')

const params = {
	scope: scopes,
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
const queryParams = new URLSearchParams(params)
const loginUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi

export { loginUrl }
