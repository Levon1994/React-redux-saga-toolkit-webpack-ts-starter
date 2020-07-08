import React from 'react';

import { Image } from 'components';

const ScanInfo = ({
  imageUrl,
}) => {
  return (
    <div className="ScanInfo">
      <div className="scan-content">
        <Image src={imageUrl} alt=""/>
        <div className="scan-label">
          <div>Temperature: <span>36.24C</span></div>
          <div>Name: <span>Bo Dallas</span></div>
          <div>Gender: <span>Male</span></div>
          <div>Email: <span>dallas.bo@maily.io</span></div>
        </div>
      </div>
      <div className="scan-data">
        <p className="time-label">7:12:44 AM</p>
        <p className="date-label">Friday, 3 Jule 2020</p>
      </div>
    </div>
  );
};

export default ScanInfo;
