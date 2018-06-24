import React, { Component } from 'react';
import Results from './Results';
import MediaSection from './media/MediaSection';
import Header from './common/Header'

import './main-page-styles.css';

class MainPage extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="topbar">
          <h1>Soundscape Generator</h1>
        </div>
        
        <div className="main-container">
          <div className="upload-container">
            {/* <Header title="Media Selection" desc="Upload an image, video or choose from one of the examples below."/> */}
            <MediaSection />
          </div>
          {/* <div className="results-container">
            <Results />
          </div> */}
        </div>
      </div>
    );
  }
}

export default MainPage;
