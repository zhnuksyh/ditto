import React from 'react';

const Card = ({ children, className = "" }) => (
    <div className={`rounded-xl border shadow-sm backdrop-blur-sm ${className}`}>
        {children}
    </div>
);

export default Card;
