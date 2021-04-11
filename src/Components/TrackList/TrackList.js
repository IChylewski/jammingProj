import './TrackList.css';
import React from 'react';
import Track from '../Track/Track';

class TrackList extends React.Component {
    render(){
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(element => {

                    return <Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} currentTrack={element}/>
                    })
                }
            </div>
        )
    }
}
export default TrackList;
