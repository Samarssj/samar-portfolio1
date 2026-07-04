// Script to search for songs on Spotify and get preview URLs
// This uses Spotify's public API without authentication

const songs = [
  { title: "Hotel Drive", artist: "Vice Monroe" },
  { title: "Bonny x Slide", artist: "Unknown" },
  { title: "Cigarette Stub", artist: "Asal" },
  { title: "Heathens", artist: "Twenty One Pilots" },
  { title: "I Want to Stay at Your House", artist: "Rose Walton" },
  { title: "Numb", artist: "Linkin Park" }
];

async function searchSpotify(track, artist) {
  try {
    const query = `${track} ${artist}`.replace(/\s+/g, '%20');
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`);
    
    if (!response.ok) {
      console.log(`Search failed for ${track} - ${artist}`);
      return null;
    }
    
    const data = await response.json();
    if (data.tracks.items.length > 0) {
      const track_data = data.tracks.items[0];
      return {
        name: track_data.name,
        artist: track_data.artists[0].name,
        preview_url: track_data.preview_url,
        image: track_data.album.images[0]?.url,
        spotify_url: track_data.external_urls.spotify,
        album: track_data.album.name
      };
    }
  } catch (error) {
    console.error(`Error searching for ${track}:`, error);
  }
  return null;
}

// Search all songs
(async () => {
  console.log("Searching for songs on Spotify...\n");
  const results = [];
  
  for (const song of songs) {
    const result = await searchSpotify(song.title, song.artist);
    if (result) {
      results.push(result);
      console.log(`✓ Found: ${result.name} by ${result.artist}`);
      console.log(`  Preview: ${result.preview_url ? 'Available' : 'Not available'}\n`);
    } else {
      console.log(`✗ Not found: ${song.title} by ${song.artist}\n`);
    }
  }
  
  console.log("\n=== Results JSON ===");
  console.log(JSON.stringify(results, null, 2));
})();
