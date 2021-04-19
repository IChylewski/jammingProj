import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [],playlistName: "My Favourite Songs", playlistTracks: [], isSaving: false};
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updateSearchResults = this.updateSearchResults.bind(this);
  }
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist});
    }
    this.updateSearchResults();
  }
  removeTrack(track){
    let newPlaylist = this.state.playlistTracks.filter(element => element.id !== track.id);
    this.setState({playlistTracks: newPlaylist});
    
    
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  updateSearchResults(){
    const newResults = this.state.searchResults.filter(ele => {
      return !this.state.playlistTracks.find(playlistTrack => playlistTrack.id === ele.id);
    })
    this.setState({searchResults: newResults});
  }
  
  savePlaylist(){
    this.setState({isSaving: true});
    console.log(this.state.isSaving);
    const trackURIs = this.state.playlistTracks.map(track => track.URI);
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(response => {
      this.setState({playlistName: 'New Playlist'});
      this.setState({playlistTracks: []});
      this.setState({isSaving: false})
    });
  }
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }
  
  render(){
    return (
      <div>
        <div className={this.state.isSaving ? "Loading-screen" : "hidden"}>
          <h1>Please wait...</h1>
        </div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults playlistTracks={this.state.playlistTracks} onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
