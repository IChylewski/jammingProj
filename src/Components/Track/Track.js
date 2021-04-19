import './Track.css';
import React from 'react';
import PlayButton from './play_button.png';
import PauseButton from './pause_button.png';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderPlayButton = this.renderPlayButton.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
        this.state = {isPlaying: false};
    }
    renderAction(){
        if(this.props.isRemoval === true){
            return <button onClick={this.removeTrack} className="Track-action">-</button>
        } else {
           return <button onClick={this.addTrack} className="Track-action">+</button>
        }
    }
    renderPlayButton(){
        if(!this.props.isRemoval && !this.state.isPlaying){

            return <img onClick={this.playTrack} className="Play-button" src={PlayButton} alt=""/>
        } else if (!this.props.isRemoval && this.state.isPlaying){

            return <img onClick={this.pauseTrack} className="Pause-button" src={PauseButton} alt=""/>
        }
    }
    addTrack(){
        this.props.onAdd(this.props.currentTrack);
        this.setState({show: false});
    }
    removeTrack(){
        this.props.onRemove(this.props.currentTrack);
    }
    playTrack(){
        this.setState({isPlaying: true});
        const songUrl = this.props.currentTrack.preview_URL;
        document.getElementById('player').src = songUrl;
        document.getElementById('player').play();
    }
    pauseTrack(){
        this.setState({isPlaying: false});
        document.getElementById('player').pause();
    }
    render(){
        return(
            <div className="Track">
                {this.renderPlayButton()}
                <div className="Track-information">
                    <h3>{this.props.currentTrack.name}</h3>
                    <p>{this.props.currentTrack.artist} | {this.props.currentTrack.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}
export default Track;