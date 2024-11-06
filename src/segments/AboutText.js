// src/AboutText.js

const AboutText = () => (
    <>

        <h4 className="mb-3">What This App Does</h4>
        <p>
            Using the Spotify API, this app securely accesses your listening data and preferences to create a unique profile. With this information, the app generates playlists with two primary objectives:
        </p>
        <p>
            1. Curated Playlists: Identify songs that exist in one part of your library but not in another.
        </p>
        <p>
            2. Personalized Recommendations: Receive suggestions that accurately reflect your listening habits, saving you time in sorting through your collection.
        </p>
        <h4 className="mb-3">Why Personalisation Matters</h4>
        <p>
            Managing a large music library can be overwhelming. For instance, having over 1,300 songs in playlists without them being in your liked songs can make it difficult to curate your favourites. Instead of adding all these songs to your liked songs list, which may include tracks you no longer listen to, this app analyses five factors to create a prioritised list of recommendations tailored to your preferences.
        </p>
        <h4 className="mb-3">How The Recommendation Algorithm Works</h4>
        <p>
            When you request a playlist, the app ranks songs based on a composite score that considers the following factors:
        </p>
        <p>
            1. Playlist Frequency: Songs that appear in multiple playlists receive a higher score (applies to liked songs recommendations only).
        </p>
        <p>
            2. Artist Score: Songs by artists on your top artists list get higher scores.
        </p>
        <p>
            3. Song Score: Tracks by artists you listen to most frequently are prioritised.
        </p>
        <p>
            4. Recently Added Score: Songs by artists associated with your recently added favourites are given preference.
        </p>
        <p>
            5. Date Added: Newer songs are scored higher than older ones.
        </p>
        <p>
            By default, each factor is weighted equally, but you can customise these weights on the setup page to tailor the recommendations to your liking. For example, if you prefer more songs from your top artists, you can adjust the weighting accordingly.
        </p>
        <h4 className="mb-3">Getting Started</h4>
        <p>
            Begin exploring your library! After updating your playlists or liked songs, make sure to log out and log back in so the app can refresh its understanding of your music collection.
        </p>
    </>
);

export default AboutText;