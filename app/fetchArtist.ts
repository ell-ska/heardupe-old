async function fetchArtist(artist: string) {
  const res = await fetch(`https://spotify-api-wrapper.appspot.com/artist/${artist}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default fetchArtist