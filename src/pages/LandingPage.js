// src/LandingPage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import demoImage from './demo.png';
import '../css/DemoImage.css';

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
                    <h1 className="mb-4 text-center">Welcome to Playlists by Patrick</h1>
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

            {/* Tech Stack Section */}
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-lg-6 text-center">
                    <h4>Tech Stack 222</h4>
                    <p>
                        This MVP, started in October 2024, uses React for the front-end and Python with FastAPI to
                        convert the backend to a web framework. The app is deployed via AWS Amplify, with AWS Lambda
                        and API Gateway for serverless infrastructure, Supabase for database management, and
                        Terraform for Infrastructure as Code (IAC).
                    </p>
                </div>
            </div>

            {/* Add your image at the bottom */}
            <footer className="text-center mt-5">
                <h4>The Playlist Generator Feature</h4>
                <img
                    src={demoImage}
                    alt="Footer Image"
                    className="footer-image"
                    loading="lazy"
                />
            </footer>
        </div>
    );
};

export default LandingPage;