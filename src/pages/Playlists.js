import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../segments/Layout';
import LoadingSpinner from '../segments/LoadingSpinner';
import '../css/Table.css';
import spotifyLogo from './spotify-logo.png'; // Import your Spotify logo

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/playlists', { withCredentials: true });
                setPlaylists(response.data.playlists);
            } catch (error) {
                setError(error);
                console.error('Error fetching playlists:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlaylists();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Layout>
                <div className="text-center">
                    <h2>Error fetching playlists.</h2>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <h4 className="text-left">Your Playlists</h4>
            <div className="table-container mt-4">
                <table className="table table-striped">
                    <thead><tr><th></th><th>Name</th><th># of Songs</th></tr></thead>
                    <tbody>
                        {playlists.length > 0 ? (
                            playlists.map((playlist, index) => (
                                <tr key={index}>
                                    <td>
                                        <a href={playlist.URL} target="_blank" rel="noopener noreferrer">
                                            <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
                                        </a>
                                    </td>
                                    <td>
                                        <a href={playlist.URL} target="_blank" rel="noopener noreferrer" className="discreet-link">
                                            {playlist.Name}
                                        </a>
                                    </td>
                                    <td>{playlist['# of Songs']}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3" className="text-left">No playlists available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Playlists;