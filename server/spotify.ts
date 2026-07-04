// Spotify API utility for fetching access tokens and song data

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '';

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get Spotify access token using Client Credentials flow
 */
export async function getSpotifyToken(): Promise<string> {
  // Check if cached token is still valid
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Spotify auth failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache token with expiration time (expires_in is in seconds)
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Refresh 1 min before expiry
    };

    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

/**
 * Search for a song on Spotify and return preview URL
 */
export async function searchSpotifySong(
  title: string,
  artist: string
): Promise<{
  name: string;
  artist: string;
  preview_url: string | null;
  image: string;
  spotify_url: string;
} | null> {
  try {
    const token = await getSpotifyToken();
    const query = `track:${title} artist:${artist}`;
    const encodedQuery = encodeURIComponent(query);

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Spotify search failed: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data.tracks.items.length === 0) {
      console.log(`No track found for: ${title} by ${artist}`);
      return null;
    }

    const track = data.tracks.items[0];

    return {
      name: track.name,
      artist: track.artists[0].name,
      preview_url: track.preview_url, // Can be null if preview not available
      image: track.album.images[0]?.url || '',
      spotify_url: track.external_urls.spotify,
    };
  } catch (error) {
    console.error(`Error searching Spotify for "${title}" by "${artist}":`, error);
    return null;
  }
}

/**
 * Search multiple songs and return their data
 */
export async function searchMultipleSongs(
  songs: Array<{ title: string; artist: string }>
): Promise<
  Array<{
    title: string;
    artist: string;
    preview_url: string | null;
    image: string;
    spotify_url: string;
  }>
> {
  const results = [];

  for (const song of songs) {
    const result = await searchSpotifySong(song.title, song.artist);
    if (result) {
      results.push({
        title: result.name,
        artist: result.artist,
        preview_url: result.preview_url,
        image: result.image,
        spotify_url: result.spotify_url,
      });
    }
  }

  return results;
}
