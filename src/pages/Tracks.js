import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../segments/Layout';
import LoadingSpinner from '../segments/LoadingSpinner';
import '../css/Table.css';
import spotifyLogo from './spotify-logo.png';

const Tracks = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/tracks', { withCredentials: true });
                setTracks(response.data.tracks);
            } catch (error) {
                setError(error);
                console.error('Error fetching tracks:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTracks();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <h2>Error fetching tracks.</h2>
            </Layout>
        );
    }

    return (
        <Layout>
            <h4 className="text-left">Your Tracks</h4>
            <div className="table-container mt-4">
                <table className="table table-striped">
                    <thead><tr><th></th><th>Name</th><th>Artist</th><th>Length (m:ss)</th></tr></thead>
                    <tbody>
                        {tracks.length > 0 ? (
                            tracks.map((track, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={track.URL} target="_blank" rel="noopener noreferrer">
                                            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
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
                            <tr><td colSpan="4" className="text-left">No tracks available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Tracks;