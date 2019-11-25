import React from 'react';
import ReactPlayer from 'react-player';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

//https://www.youtube.com/watch?v=9zkwHIsiVoE

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
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
          <label className="ui input">
            <input type="text" placeholder="Insert video URL" onChange={this.handleChange} />
          </label>
          <div className="video">
            <ReactPlayer
              ref={this.ref}
              url={this.state.url}
              playing={this.state.playing}
              muted={this.state.muted}
              volume={this.state.volume}
              onProgress={this.handleProgress}
            />
          </div>
          <div className="progressBar" onClick={this.changeProgress}><div className="progress" style={{ width: this.state.progress + "%" }}></div></div>
          <div className="buttons">
            <button className="ui icon left labeled button" onClick={this.handlePlay}><i aria-hidden="true" className="pause icon"></i>Play</button>
            <button className="ui button" onClick={this.handleMute}>Mute</button>
            <button className="ui yellow inverted button" onClick={this.handleVolumeUP}>+</button>
            <button className="ui yellow inverted button" onClick={this.handleVolumeDown}>-</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
