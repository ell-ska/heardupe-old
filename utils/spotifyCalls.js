import { getServerSession } from 'next-auth'
import { signIn } from 'next-auth/react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import spotifyApi from './spotify'

const authenticate = async () => {
    const session = await getServerSession(authOptions)
    
    if (!session.user.accessToken) {
        signIn()
    }

    spotifyApi.setAccessToken(session.user.accessToken)
}

const getUserPlaylists = async (limit) => {
    await authenticate()

    const data = await spotifyApi.getUserPlaylists({ limit })
    return data.body.items
}

const getTopArtists = async (limit) => {
    await authenticate()

    const data = await spotifyApi.getMyTopArtists({ limit })
    return data.body.items
}

export { getUserPlaylists, getTopArtists }