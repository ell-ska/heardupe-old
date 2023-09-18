import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import spotifyApi from '../utils/spotify'

const useSpotify = () => {
	const { data: session } = useSession()

	useEffect(() => {
		if (session) {
			if (session.error === 'RefreshAccesTokenError') {
				signIn()
			}

			spotifyApi.setAccessToken(session.user.accessToken)
		}
	}, [session])

	return spotifyApi
}

export default useSpotify
