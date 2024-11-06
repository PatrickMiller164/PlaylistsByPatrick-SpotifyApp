// src/TopTracks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../segments/Layout';
import LoadingSpinner from '../segments/LoadingSpinner';
import '../css/Table.css';
import spotifyLogo from './spotify-logo.png'; // Import your Spotify logo

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/top_tracks', { withCredentials: true });
                setTopTracks(response.data.top_tracks);
            } catch (error) {
                setError(error);
                console.error('Error fetching top tracks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopTracks();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <h2>Error fetching top tracks.</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <h4 className="text-left">Your Top Tracks</h4>
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
                        {topTracks.length > 0 ? (
                            topTracks.map((track, index) => (
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
        </Layout>
    );
};

export default TopTracks;