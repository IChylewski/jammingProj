import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [{name: '123', artist:'Bruno', album: 'sunset', id: 0},{name: '123', artist:'Bruno', album: 'sunset', id: 1},{name: '123', artist:'Bruno', album: 'sunset', id: 2}],
    playlistName: "My Favourite Songs", playlistTracks: [{name: '123', artist:'Bruno', album: 'sunset', id: 0},{name: '123', artist:'Bruno', album: 'sunset', id: 1}]};
    
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } else {
      let newPlaylist = this.state.playlistTracks;
      newPlaylist.push(track);
      this.setState({playlistTracks: newPlaylist});
    }
  }
  removeTrack(track){
    let newPlaylist = this.state.playlistTracks.filter(element => element.id !== track.id);
    this.setState({playlistTracks: newPlaylist});;
    
  }
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
    
  
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
