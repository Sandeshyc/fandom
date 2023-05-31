import React from 'react';

interface TooltipProps {
    message: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => (
    <div className="group relative flex">
        {children}
        <span className="absolute z-[1] top-[100%] scale-0 transition-all rounded bg-gray-100 py-2 px-4 text-xs text-black group-hover:scale-100">{message}</span>
    </div>
);

export default Tooltip;