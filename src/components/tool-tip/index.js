import React from 'react';

const textStyle = {
  fontSize: '42px',
  fill: '#FFFFFF',
  fontWeight: 'bold'
};

const containerStyle = {
  opacity: 0.9
};;

const ToolTip = ({ cursorPosition, value }) => {
  return (
    <g transform={`translate(${cursorPosition.x - 50}, ${cursorPosition.y - 160})`}>
      <svg viewBox="0 0 250 400" width={100} height={160}>
        <g>
          <g style={containerStyle} filter="url(#9Wd3MHh7Bt5JfjkH3qE8enBGFtm2WfUA)">
            <circle vectorEffect="non-scaling-stroke" cx="124.99999999999994" cy="135.00000000000003" r="115" fill="rgb(255,255,255)"/>
            <path d=" M 20 180 Q 102 380 130 380 Q 158 380 230 180" fill="rgb(255,255,255)"/>
          </g>
          <defs>
            <filter id="9Wd3MHh7Bt5JfjkH3qE8enBGFtm2WfUA" x="-16" y="-6" width="282" height="412" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4.293609062839028"/>
              <feOffset dx="0" dy="0" result="pf_100_offsetBlur"/>
              <feFlood floodColor="#000000" floodOpacity="0.65"/>
              <feComposite in2="pf_100_offsetBlur" operator="in" result="pf_100_dropShadow"/>
              <feBlend in="SourceGraphic" in2="pf_100_dropShadow" mode="normal"/>
            </filter>
          </defs>
          <g opacity="0.51">
            <circle vectorEffect="non-scaling-stroke" cx="124.99999999999993" cy="135.00000000000003" r="75" fill="rgb(0,0,0)"/>
          </g>
          <g transform="matrix(1,0,0,1,80,90)">
            <text
              transform="matrix(1,0,0,1,33.708,53.966)"
              style={textStyle}
              textAnchor="middle"
            >
              {value}
            </text>
          </g>
        </g>
      </svg>
    </g>
  )
}

export default ToolTip;