import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../segments/Navbar';
import LoadingSpinner from '../segments/LoadingSpinner';

const AccountInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const [error, setError] = useState(null); // New error state

    useEffect(() => {
        const fetchUserInfo = async () => {
            document.title = "Loading...";
            try {
                const { data } = await axios.get('https://uxk5aw44j1.execute-api.eu-west-2.amazonaws.com/dev/user/info', {
                    withCredentials: true, // Ensure cookies are sent with the request
                });

                setUserInfo(data);
            } catch (err) {
                setError(err);
                console.error('Error fetching user info:', err);
            } finally {
                setLoading(false); // Set loading to false after data fetching is complete
                document.title = "User Information";
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="container mt-4 text-center">
                    <h2>Error fetching user information.</h2>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-md-8 col-sm-10">
                        <h4 className="mb-3">Account Info</h4>
                        {Object.entries({
                            'Display Name': userInfo.display_name,
                            'Spotify Product': userInfo.spotify_product,
                            'User ID': userInfo.user_id,
                            'Email': userInfo.email,
                            'Followers': userInfo.total_followers
                        }).map(([key, value]) => (
                            <p key={key}><strong>{key}:</strong> {value}</p>
                        ))}
                        <a href={userInfo.spotify_url} target="_blank" rel="noopener noreferrer" className="btn btn-link p-0">
                            Open Spotify Profile
                        </a>
                        {userInfo.image_url && (
                            <div className="text-left mt-3">
                                <img
                                    src={userInfo.image_url}
                                    alt={userInfo.display_name}
                                    width="100"
                                    className="img-fluid rounded-circle"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountInfo;