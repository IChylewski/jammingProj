let accessToken;
const clientID = 'aea875170e554c4c853ec985c1bfda3f';
const redirectURI = 'http://localhost:3000/callback';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=playlist-modify-public`;
            window.location = accessUrl;
        }

 },
    search(term){
        accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {Authorization:  `Bearer ${accessToken}`}
        }).then(response => response.json())
        .then(jsonResponse =>{
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    URI: track.uri,
                    preview_URL: track.preview_url
                }
            })
        })
    },
    savePlaylist(name, trackURIs){
        if(!name && !trackURIs){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        
       
        let userID;
        return fetch(`https://api.spotify.com/v1/me`,{
            headers: {Authorization:  `Bearer ${accessToken}`}
        })
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
                headers: {Authorization: `Bearer ${accessToken}`},
                method: 'POST',
                body: JSON.stringify({ name: name })
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
                    headers: {Authorization: `Bearer ${accessToken}`},
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                })
            })
        })
        
    }
}

export default Spotify; 