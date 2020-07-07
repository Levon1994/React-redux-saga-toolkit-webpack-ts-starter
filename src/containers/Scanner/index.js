import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';

import { useMount } from 'utils/hooks';

import { Image } from 'components';

import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import scannerContentUrl from 'assets/scanning-content.png';
import overlayUrl from 'assets/fade.png';

import './index.scss';

const startVideo = (canvas, video) => {
  const context = canvas.getContext('2d');
  let vendorUrl = window.URL || window.webkitURL;

  navigator.getMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia;


  navigator.getMedia(
    { video: true, audio: false },
    stream => {
      video.srcObject = stream;
      video.play();
    },
    err => console.log('err', err),
  );

  const draw = (video, context, width, height) => {
    context.drawImage(video, 0, 0, width, height);
    setTimeout(draw, 10, video, context, width, height);
  };

  video.addEventListener('play', function() {
    draw(this, context, 768, 1024);
  }, false);

};

const Scanner = () => {
  const hiddenCanvas = useRef();

  const [imageUrl, setImageUrl] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [video, setVideo] = useState();

  useMount(() => {
    const video = document.getElementsByTagName('video');
    setVideo(video);
  });

  useEffect(() => {
    if (isScanning) {
      setTimeout(() => {
        setIsScanned(true);
        setIsScanning(false);
      }, 1000);
    }
  }, [isScanning]);

  return (
    <div className="Scanner flexible grow aEnd jCenter">
      <div className="title">
        {isScanning && 'Scanning...'}
        {!isScanning && isScanned &&
          <>
            <div className="flexible">
              <span className="success">Normal</span>
              temperature
            </div>
            <div className="subtitle">Please Pass</div>
          </>
        }
      </div>
      {!imageUrl &&
         <Camera
            onTakePhoto={url => {
              setImageUrl(url);
              setIsScanning(true);
            }}
          />
      }
      {
        imageUrl &&
        <Image
          className={classnames('scanner-image')}
          id="main-image"
          path={imageUrl}
          width={768}
          height={1024}
        />
      }
      <Image
        className={classnames('scanner-content', { 'zIndex': imageUrl })}
        id="scanning-body"
        path={overlayUrl}
      />
    </div>
  );
};

export default Scanner;
