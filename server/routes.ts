import { Router } from 'express';
import { searchSpotifySong, searchMultipleSongs } from './spotify';

const router = Router();

/**
 * GET /api/spotify/search
 * Search for a single song on Spotify
 * Query params: title, artist
 */
router.get('/spotify/search', async (req, res) => {
  try {
    const { title, artist } = req.query;

    if (!title || !artist) {
      return res.status(400).json({
        error: 'Missing required query parameters: title, artist',
      });
    }

    const result = await searchSpotifySong(
      String(title),
      String(artist)
    );

    if (!result) {
      return res.status(404).json({
        error: 'Song not found on Spotify',
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /api/spotify/search:', error);
    res.status(500).json({
      error: 'Failed to search Spotify',
    });
  }
});

/**
 * POST /api/spotify/search-multiple
 * Search for multiple songs on Spotify
 * Body: { songs: Array<{ title: string; artist: string }> }
 */
router.post('/spotify/search-multiple', async (req, res) => {
  try {
    const { songs } = req.body;

    if (!Array.isArray(songs)) {
      return res.status(400).json({
        error: 'Body must contain "songs" array',
      });
    }

    const results = await searchMultipleSongs(songs);

    res.json({
      count: results.length,
      songs: results,
    });
  } catch (error) {
    console.error('Error in /api/spotify/search-multiple:', error);
    res.status(500).json({
      error: 'Failed to search Spotify',
    });
  }
});

export default router;
