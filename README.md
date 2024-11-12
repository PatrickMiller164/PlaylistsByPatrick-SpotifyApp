# Welcome to my Spotify App: Playlists by Patrick

### About this Repository

This repository houses the front-end code for my app. It was built using React, and is currently 
deployed on AWS via AWS Amplify. This is connected to the back-end via AWS API Gateway and AWS Lambda. 
The back-end was written in Python, and then converted into a webframework using FastAPI.

Here is the link to my app: https://main.d2me7vq60w2nib.amplifyapp.com/

This app uses the Spotify API and is currently in development mode. To roll this app out publicly, 
I have submitted a Quota Extension Request. For now only registered users can use it's functions.
If you would like to give it a go, please do reach out to me! I'll need your name and Spotify account email.

### What This App Does

This app securely accesses your listening data and preferences to create a unique profile in order to
generate customised playlists with two main features:

1. Curated Playlists: Finds songs that exist in one area of your library but not another, helping you discover overlooked favourites.
2. Personalised Recommendations: Suggests songs that truly reflect your listening habits, saving you from sorting through vast collections.

### Why Personalisation Matters

With large music libraries, managing playlists can be overwhelming. 
For instance, if you have thousands of songs spread across different playlists and your Liked Songs, 
it’s easy to lose track of favourites.
This app aims to make playlist management easier by using a five-factor algorithm to identify the tracks you're most likely
to want to add your playlists or Liked Songs.


### How the Recommendation Algorithm Works

When you generate a playlist, the app ranks songs based on a composite score derived from five factors:

1. Playlist Frequency: Songs appearing in multiple playlists score higher (for liked songs recommendations only). 
2. Artist Score: Songs by your top artists are prioritised.
3. Tracks Score: Tracks from frequently listened-to artists are prioritised.
4. Recently Added Score: Songs associated with recently added favourites get preference.
5. Date Added to Library: Newer songs score higher than older ones.

Each factor is given a 20% weighting by default, but you can customise these weights on the setup page to tailor 
your recommendations. For example, if you’d like more songs from your top artists, you can increase this factor weighting.

### User Experience Example

Here is an example of how the user would use this app to generate a playlist of track recommendations for their Liked Songs.
All recommendations will be tracks that are in a user's playlists but not in a user's Liked Songs.

1. The user enters the URL into their browser to arrive at the landing page.
    ![Alt text](images/1_landing_page.png)

2. Upon pressing _Login via Spotify_, they are redirected to the Spotify login page where they enter their credentials
and give authorise several position scopes. They are then redirected to the home page where they can read about what this app
does and how it works.
    ![Alt text](images/2_home_page.png)

3. To generate a playlist, they can click on _Playlist Generator_ in the navigation bar. On this page, the user
can select whether they want a playlist which recommends tracks for either their Liked Songs or their playlists, 
select the number of songs they want in the generated playlist, and select the weightings for each factor.
    ![Alt text](images/8a_playlist_generator.png)

4. After the user presses _Generate Playlist_, the generated playlist is displayed in a table, along with the
option to add this playlist to Spotify. The 100 songs in this playlist are the 100 songs which had the highest composite
scores according the factor weighting inputted, with the top-scoring track at the top of the list. If the user wants to
try a different weighting, they can toggle the sliders to generate a new playlist. Once happy, the user has the option
to add the playlist to their spotify account. 
    ![Alt text](images/8b_playlist_generator.png)

5. Once _Add to Spotify_ is pressed, the user can click on _View in Spotify_, which will redirect 
them to their newly created playlist.
    ![Alt text](images/9_generated_playlist.png)

### Other Features

As seen on the navigation bar, this app also lets users view information about their Spotify library. 

For example, your playlists
    ![Alt text](images/4_your_playlists.png)

and your top artists:
    ![Alt text](images/6_your_top_artists.png)


