import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { Image } from 'components';

import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import detectedContentUrl from 'assets/detected-content.png';
import overlayUrl from 'assets/fade.png';

import ScanInfo from './ScanInfo';

import './index.scss';

const Scanner = () => {
  const [imageUrl, setImageUrl] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

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
      <canvas id="canvas" />
      {!imageUrl &&
         <Camera
            onTakePhoto={url => {
              setImageUrl(url);
              setIsScanning(true);
            }}
          />
      }
      {imageUrl &&
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
      {imageUrl && !isScanned &&
        <Image
          className={classnames('scanner-content',{ 'zIndex': imageUrl })}
          id="scanning-body"
          path={detectedContentUrl}
        />
      }
      {imageUrl && isScanned &&
        <ScanInfo imageUrl={imageUrl} />
      }
    </div>
  );
};

export default Scanner;
