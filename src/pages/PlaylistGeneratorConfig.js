import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../segments/Layout';
import LoadingSpinner from '../segments/LoadingSpinner';
import spotifyLogo from './spotify-logo.png'; // Import your Spotify logo

const Config = () => {
    const [loading] = useState(false);
    const [error, setError] = useState(null);
    const [playlistLength, setPlaylistLength] = useState(100);
    const [weights, setWeights] = useState(Array(5).fill(20));
    const [generatedPlaylist, setGeneratedPlaylist] = useState([]);
    const [playlistType, setPlaylistType] = useState('liked_songs');
    const [lengthError, setLengthError] = useState('');
    const [weightError, setWeightError] = useState('');
    const [showDescriptions, setShowDescriptions] = useState(false);
    const [playlistGenerated, setPlaylistGenerated] = useState(false);
    const [spotifyLink, setSpotifyLink] = useState(null);
    const [loadingSpotify, setLoadingSpotify] = useState(false); // Track loading state for "Add to Spotify"
    const [loadingGenerate, setLoadingGenerate] = useState(false); // Track loading state for "Generate Playlist"
    const [showSpotifyButtons, setShowSpotifyButtons] = useState(true); // Control visibility of Spotify buttons

    const handleWeightChange = (index, value) => {
        const newWeights = [...weights];
        newWeights[index] = Number(value);
        setWeights(newWeights);
        validateWeights(newWeights);
    };

    const validateWeights = (weightsArray) => {
        const totalWeight = weightsArray.reduce((acc, curr) => acc + curr, 0);
        if (totalWeight !== 100) {
            setWeightError('Weights must add up to 100%.');
        } else {
            setWeightError('');
        }
    };

    const handleGeneratePlaylist = async () => {
        if (playlistLength <= 0) {
            setLengthError('Number of songs needs to be greater than 0.');
            return;
        } else {
            setLengthError('');
        }

        if (weightError) {
            return;
        }

        setLoadingGenerate(true); // Start loading spinner for "Generate Playlist"
        setShowSpotifyButtons(false); // Hide Spotify buttons when generating playlist
        setError(null);

        try {
            const endpoint = playlistType === 'liked_songs'
                ? 'https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/recommendations/liked_songs'
                : 'https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/recommendations/playlists';

            const response = await axios.post(endpoint, {
                length: playlistLength,
                weights: weights,
            }, { withCredentials: true });

            setGeneratedPlaylist(response.data.df);
            setPlaylistGenerated(true);
            setSpotifyLink(null); // Reset the Spotify link when generating a new playlist
            setLoadingSpotify(false); // Reset Spotify loading state
        } catch (error) {
            setError(error);
            console.error('Error generating playlist:', error);
            alert('Failed to generate playlist.');
        } finally {
            setLoadingGenerate(false); // Stop loading spinner for "Generate Playlist"
            setShowSpotifyButtons(true); // Show Spotify buttons after playlist generation finishes
        }
    };

    const handleAddToSpotify = async () => {
        setLoadingSpotify(true); // Start loading spinner

        try {
            const response = await axios.post('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/added', {
                length: playlistLength,
                weights: weights,
                type: playlistType,
            }, { withCredentials: true });

            const { link } = response.data;
            setSpotifyLink(link); // Set Spotify link when successfully added
        } catch (error) {
            console.error('Error adding to Spotify:', error);
            alert('Failed to add playlist to Spotify.');
        } finally {
            setLoadingSpotify(false); // Stop loading spinner
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <div className="text-center">
                    <h2>Error generating playlist.</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <h3 className="text-left">Generate Your Playlist</h3>

            <div className="d-flex mb-3">
                <div className="me-3" style={{ flex: 1 }}>
                    <label htmlFor="playlistType" className="form-label"><h6>Select playlist type:</h6></label>
                    <select
                        id="playlistType"
                        value={playlistType}
                        onChange={(e) => setPlaylistType(e.target.value)}
                        className="form-select"
                    >
                        <option value="liked_songs">Recommendations for Liked Songs</option>
                        <option value="playlists">Recommendations for Playlists</option>
                    </select>
                </div>

                <div style={{ flex: 1 }}>
                    <label htmlFor="playlistLength" className="form-label"><h6>Input number of playlist songs:</h6></label>
                    <input
                        type="number"
                        id="playlistLength"
                        value={playlistLength}
                        onChange={(e) => setPlaylistLength(e.target.value)}
                        className="form-control"
                        min="1"
                    />
                    {lengthError && <div className="text-danger">{lengthError}</div>}
                </div>
            </div>

            <h6 className="text-left">Adjust factor weightings (must add up to 100%):</h6>
            <div className="d-flex justify-content-around mb-3" style={{ width: '100%', flexWrap: 'wrap' }}>
                {weights.map((weight, index) => (
                    <div className="slider-wrapper" key={index} style={{ width: '150px', textAlign: 'center' }}>
                        <label className="form-label">{getWeightFactorName(index)}</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={weight}
                            onChange={(e) => handleWeightChange(index, e.target.value)}
                            className="form-range"
                        />
                        <div className="d-flex justify-content-between">
                            <span>0</span>
                            <span>{weight}</span>
                            <span>100</span>
                        </div>
                    </div>
                ))}
            </div>

            {weightError && <div className="text-danger">{weightError}</div>}

            <div className="mb-3">
                <button
                    onClick={() => setShowDescriptions(!showDescriptions)}
                    className="btn btn-info me-2"
                >
                    {showDescriptions ? 'Hide Descriptions' : 'Show Descriptions'}
                </button>

                <button onClick={handleGeneratePlaylist} className="btn btn-primary me-2">
                    {loadingGenerate ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Generate Playlist'
                    )}
                </button>

                {/* Conditionally render the "Add to Spotify" button */}
                {showSpotifyButtons && playlistGenerated && (
                    <button onClick={handleAddToSpotify} className="btn btn-primary me-2">
                        {loadingSpotify ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            'Add to Spotify'
                        )}
                    </button>
                )}

                {/* Conditionally render "View in Spotify" button if link is available */}
                {showSpotifyButtons && spotifyLink && (
                    <a href={spotifyLink} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                        View in Spotify
                    </a>
                )}
            </div>

            {showDescriptions && (
                <div className="alert alert-info mt-3" role="alert">
                    <h6 className="text-left">Weighting Factor Descriptions:</h6>
                    <ul>
                        {getWeightFactorDescriptions().map((description, index) => (
                            <li key={index}>{getWeightFactorName(index)}: {description}</li>
                        ))}
                    </ul>
                </div>
            )}

            {generatedPlaylist.length > 0 && (
                <div className="table-container mt-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {/* Add new header for Spotify logo */}
                            <th></th>
                            <th>Name</th>
                            <th>Artist</th>
                            <th>Length (m:ss)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generatedPlaylist.length > 0 ? (
                            generatedPlaylist.map((track, index) => (
                                <tr key={index}>
                                    {/* New column with the Spotify logo link */}
                                    <td>
                                        <a href={track.URL} target="_blank" rel="noopener noreferrer">
                                            <img src={spotifyLogo} alt="Spotify" className="spotify-logo" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href={track.URL} target="_blank" rel="noopener noreferrer" className="discreet-link">
                                            {track.Name}
                                        </a>
                                    </td>
                                    <td>{track.Artist}</td>
                                    <td>{track['Length (m:ss)']}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-left">No top tracks available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            )}
        </Layout>
    );
};

// Helper functions
const getWeightFactorName = (index) => {
    const names = [
        'Playlist Frequency',
        'Top Artists',
        'Top Tracks',
        'Recently Added',
        'Date Added',
    ];
    return names[index];
};

const getWeightFactorDescriptions = () => {
    return [
        'Songs that appear in multiple playlists receive a higher score (applies to liked songs recommendations only).',
        'Songs by artists on your top artists list get higher scores.',
        'Tracks by artists you listen to most frequently are prioritized.',
        'Songs by artists associated with your recently added favorites are given preference.',
        'Newer songs are scored higher than older ones.',
    ];
};

export default Config;