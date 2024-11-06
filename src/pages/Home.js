// src/HomePage.js

import React from 'react';
import Navbar from '../segments/Navbar';
import AboutText from "../segments/AboutText.js";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="col-lg-9 col-md-8 col-sm-10 mx-auto">
                    <AboutText />
                </div>
            </div>
        </div>
    );
};

export default HomePage;