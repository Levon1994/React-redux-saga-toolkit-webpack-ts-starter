import React from 'react';

import { Image } from 'components';

import qrCodePath from 'assets/qr-code.svg';
import qrCodeArrows from 'assets/qr-code-arrow.svg';

import './index.scss';

const QRCode = () => {
  return (
    <div className="QRCode flexible vertical aCenter jBetween grow">
      <div className="flexible vertical aCenter">
        <div className="title">Scan your QR code</div>
        <div className="subtitle">Bring the image of your QR code to the cameras below</div>
      </div>
      <Image
        path={qrCodePath}
        className="qr-code-image"
      />
      <Image
        path={qrCodeArrows}
        width={115}
      />
    </div>
  );
};

export default QRCode;
