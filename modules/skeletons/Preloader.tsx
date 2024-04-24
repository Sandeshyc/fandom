import React from 'react'
const Preloader = () => {
    return (
        <div className={`relative min-h-screen min-w-screen flex justify-center items-center bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]`}>
            <div className="loader">
            </div>
        </div>
    );
}
export default Preloader;