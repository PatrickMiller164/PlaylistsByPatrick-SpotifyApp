// src/LoadingSpinner.js
import React from 'react';
import Layout from './Layout';

const LoadingSpinner = () => {
    return (
        <Layout>
            <div className="text-left mt-4">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Layout>
    );
};

export default LoadingSpinner;