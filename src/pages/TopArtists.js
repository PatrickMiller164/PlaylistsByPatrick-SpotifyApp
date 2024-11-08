import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../segments/Layout';
import LoadingSpinner from '../segments/LoadingSpinner';
import '../css/Table.css';
import spotifyLogo from './spotify-logo.png';

const TopArtists = () => {
    const [topArtists, setTopArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const response = await axios.get('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/top_artists', { withCredentials: true });
                setTopArtists(response.data.top_artists);
            } catch (error) {
                setError(error);
                console.error('Error fetching top artists:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopArtists();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <h2>Error fetching top artists.</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <h4 className="text-left">Your Top Artists</h4>
            <div className="table-container mt-4">
                <table className="table table-striped">
                    <thead><tr><th></th><th>Artist</th><th>Popularity</th><th>Genres</th></tr></thead>
                    <tbody>
                        {topArtists.length > 0 ? (
                            topArtists.map((artist, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={artist.URI} target="_blank" rel="noopener noreferrer">
                                            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href={artist.URI} target="_blank" rel="noopener noreferrer" className="discreet-link">
                                            {artist.Artist}
                                        </a>
                                    </td>
                                    <td>{artist.Popularity}</td>
                                    <td>{artist.Genres}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="4" className="text-left">No top artists available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default TopArtists;