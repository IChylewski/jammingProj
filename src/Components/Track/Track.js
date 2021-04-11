import './Track.css';
import React from 'react';

class Track extends React.Component {
    constructor(props){
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(){
        if(this.props.isRemoval === true){
            return <button onClick={this.removeTrack} className="Track-action">-</button>
        } else {
           return <button onClick={this.addTrack} className="Track-action">+</button>
        }
    }
    addTrack(){
        this.props.onAdd(this.props.currentTrack);
    }
    removeTrack(){
        this.props.onRemove(this.props.currentTrack);
    }
    render(){
        return(
            <div className="Track">
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