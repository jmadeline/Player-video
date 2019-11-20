import React from 'react';
import ReactPlayer from 'react-player';
import './App.css';

//https://www.youtube.com/watch?v=9zkwHIsiVoE

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: 'https://www.youtube.com/watch?v=9zkwHIsiVoE',
      playing: false,
      muted: false,
      volume: 0.5,
      progress: 0
    }
  }

  handleChange = (event) => {
    this.setState({ url: event.target.value });
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
  }

  handleMute = () => {
    this.setState({ muted: !this.state.muted });
  }

  handleVolumeUP = () => {
    this.setState(
      (prevState) => ({ ...prevState, volume: this.state.volume + 0.1 })
    )
  }

  handleVolumeDown = () => {
    this.setState(
      (prevState) => ({ ...prevState, volume: this.state.volume - 0.1 })
    )
  }

  handleProgress = (data) => {
    this.setState({ progress: data.played.toFixed(2) * 100 });
  }

  changeProgress = (event) => {
    const result = event.pageX / window.innerWidth;
    this.player.seekTo(result);
  }

  ref = player => {
    this.player = player;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" onChange={this.handleChange} />
          <ReactPlayer
            ref={this.ref}
            url={this.state.url}
            playing={this.state.playing}
            muted={this.state.muted}
            volume={this.state.volume}
            onProgress={this.handleProgress}
          />
          <div className="progressBar" onClick={this.changeProgress}><div className="progress" style={{ width: this.state.progress + "%" }}></div></div>
          <div className="buttons">
            <button onClick={this.handlePlay}>Play / Pause</button>
            <button onClick={this.handleMute}>Mute</button>
            <button onClick={this.handleVolumeUP}>+</button>
            <button onClick={this.handleVolumeDown}>-</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
