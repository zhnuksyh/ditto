import React from 'react';

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false }) => {
    const baseStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all transform active:scale-95 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";
    const finalClass = `${baseStyle} ${className}`;

    return (
        <button onClick={onClick} disabled={disabled} className={finalClass}>
            {children}
        </button>
    );
};

export default Button;
