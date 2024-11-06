// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import AccountInfo from './pages/AccountInfo.js';
import Playlists from './pages/Playlists.js';
import Tracks from './pages/Tracks.js';
import TopArtists from './pages/TopArtists.js';
import TopTracks from './pages/TopTracks.js';
import Config from  './pages/PlaylistGeneratorConfig.js'

const App = () => {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/user/info" element={<AccountInfo />} />
                    <Route path="/user/playlists" element={<Playlists />} />
                    <Route path="/user/tracks" element={<Tracks />} />
                    <Route path="/user/top_artists" element={<TopArtists />} />
                    <Route path="/user/top_tracks" element={<TopTracks />} />
                    <Route path="/playlist_generator" element={<Config />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;