import React, { Component } from 'react';
import { connect } from 'react-redux';
import { soundActions } from '../../core/sounds';
import webAudioUtil from '../../audio/webAudioUtil';
import { Icon } from 'antd';
import './audio-player-styles.css';

class AudioPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword,
            sourcePosition: {
                x: 0,
                y: 0.5,
                z: 0.5
            },
            gain: 1,
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.updateSourcePosition = this.updateSourcePosition.bind(this);
        this.setGain = this.setGain.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }

    setupAudioElement() {
        const { keyword, stopSound} = this.props;
        const {audioElement} = this.state
        const sound = this.props.sounds[keyword].sound;
        const newSource = sound.previews["preview-hq-mp3"];
        
        if (!audioElement || audioElement.src !== newSource) {
            const source = webAudioUtil.createAudioSource(keyword, newSource);
        }

    }

    componentDidMount() {
        console.log("audio did mount");
        const { keyword, shouldPlay, playSound} = this.props; 
        this.setupAudioElement();
        if (shouldPlay) {
            this.audioElement.play();
            playSound(keyword);
        }
    }

    componentWillUnMount() {
        console.log("audio component will unmount")
    }

    componentDidUpdate() {
        const { keyword, sourcePosition, gain, audioElement, source} = this.state;
        const { isPlaying } = this.props.sounds[keyword];
        if (!audioElement) return;
        //play/pause
        if (isPlaying) {
            webAudioUtil.playAudio(keyword);
        } else {
            audioElement.pause();
            audioElement.currentTime = 0;
        }

        // resonance
        source.setPosition(sourcePosition.x, sourcePosition.y, sourcePosition.z);
        source.setGain(gain);

        // audio source
        // this.audioElement.crossOrigin = "anonymous";
        this.setupAudioElement();
    }

    togglePlay() {
        const {playSound, stopSound, keyword} = this.props;
        const {isPlaying} = this.props.sounds[keyword];
        if (isPlaying) {
            stopSound(keyword);
        } else {
            playSound(keyword);
        }
    }

    shuffle() {
        const {stopSound, getNextSound, keyword} = this.props
        stopSound(keyword);
        getNextSound(keyword);
    }

    setGain(e) {
        e.preventDefault();
        const value = parseFloat(e.target.value)
        this.setState({gain: value});
    }

    updateSourcePosition(e) {
        e.preventDefault();
        const target = e.target;
        const value = parseFloat(target.value)
        this.setState({
            ...this.state,
            sourcePosition: {
                ...this.state.sourcePosition,
                [target.name]: value
            }
        })
    }

    render() {
        const { sourcePosition, keyword, key} = this.state;
        console.log("render", keyword)
        const { isPlaying } = this.props.sounds[keyword];
        const { name } = this.props;

        return (
            <div className="audio-player" key={key}>
                <button onClick={this.togglePlay} className="play-button">
                    {(isPlaying) ? <Icon type="pause-circle" /> : <Icon type="play-circle" />}
                </button>
                <button onClick={this.shuffle} className="play-button">
                    Shuffle
                </button>
                <div className="audio-name">{name}</div>
                <label htmlFor="x">
                    Pan
                    <input type="range" 
                        value={sourcePosition.x}
                        name="x"
                        min={-1}
                        max={1}
                        step={0.001}
                        onChange={this.updateSourcePosition} />
                </label>
                <label htmlFor="x">
                    Volume
                    <input type="range" 
                        value={this.gain}
                        name="x"
                        min={0.001}
                        max={1}
                        step={0.001}
                        onChange={this.setGain} />
                </label>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        sounds: state.sounds
    }
}

export default connect(mapStateToProps, soundActions)(AudioPlayer);
