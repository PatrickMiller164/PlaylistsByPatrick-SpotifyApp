// src/Layout.js
import React from 'react';
import Navbar from '../segments/Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-left">
                    <div className="col-lg-9 col-md-8 col-sm-10 mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;