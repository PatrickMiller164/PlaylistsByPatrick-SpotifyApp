// src/LandingPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LandingPage = () => {
    const [spotifyAuthUrl, setSpotifyAuthUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/");
                setSpotifyAuthUrl(response.data.spotify_auth_url);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleLogin = () => {
        if (spotifyAuthUrl) {
            window.location.href = spotifyAuthUrl;
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-6">
                    <h1 className="mb-4 text-center">Welcome to Playlists by Patrick (TEST)</h1>
                    {spotifyAuthUrl ? (
                        <div className="text-center">
                            <p>
                            If you have a large collection of playlists and liked songs on Spotify,
                            this app is designed for you. It aims to help Spotify users who want to organise
                            their music efficiently.
                            </p>
                            <button onClick={handleLogin} className="btn btn-primary btn-lg">
                                Login via Spotify
                            </button>
                        </div>
                    ) : (
                        <div className="alert alert-info mt-3" role="alert">
                            Loading...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;