import React, { useEffect, useState, useRef } from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import { Spin } from 'antd'; // Importer le composant Spin d'Ant Design
import './app.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { message } from 'antd';

import { SpotifyApiContext } from 'react-spotify-api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { SpotifyAuth } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))


  const spotifyApi = useRef(new SpotifyWebApi());

  /*useEffect(() => {
    if (accessToken) {
      spotifyApi.current.setAccessToken(accessToken);
      spotifyApi.current.getMe().then(data => {

        if (data.body.product !== 'premium') {
          message.error('You need a premium Spotify account to use this app');
        }

        setIsPremium(data.body.product === 'premium');
        setIsLoading(false);
      }).catch((err) => {
        message.error('An error occured while trying to get your Spotify account type', err);
        setIsPremium(false);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [accessToken]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" />
    </div>
    
    );
  }

  console.log('accessToken', accessToken);

  return accessToken && isPremium ? <Dashboard accessToken={accessToken} /> : <Login />;

  */

  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          
          
          <Dashboard />
          
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/'
          clientID='80256b057e324c5f952f3577ff843c29'
          scopes={['streaming', 'user-read-email', 'user-read-private' , 'user-library-read', 'user-library-modify', 'user-top-read', 'user-read-playback-state', 'user-modify-playback-state']}
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  )
  


}

export default App;
