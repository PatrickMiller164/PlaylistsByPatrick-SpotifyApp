// src/Navbar.js
import React from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', path: '/home' },
        { name: 'Account Info', path: '/user/info' },
        { name: 'Playlists', path: '/user/playlists' },
        { name: 'Tracks', path: '/user/tracks' },
        { name: 'Top Artists', path: '/user/top_artists' },
        { name: 'Top Tracks', path: '/user/top_tracks' },
        { name: 'Playlist Generator', path: '/playlist_generator' },
    ];

    const handleLogout = async () => {
        try {
            const response = await axios.get('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/logout', { withCredentials: true });
            if (response.status === 200) {
                navigate('/'); // Redirect to the landing page
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center w-100">
                    <NavLink className="navbar-brand" to="/home">Playlists by Patrick</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {navItems.map((item) => (
                                <li className="nav-item" key={item.path}>
                                    {/* Use className with a function to apply 'active' when the link is active */}
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleLogout} className="btn btn-danger ml-auto">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;