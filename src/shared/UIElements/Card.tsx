import React from 'react';

import './Card.css';

const Card: React.FC<{className?: string, style: any}> = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;