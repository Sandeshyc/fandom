import React from "react";
const CastCarouselItem = () => {
    return (
        <div className="group relative">
            <div className="aspect-[2/3] overflow-hidden rounded-md">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg/220px-Dwayne_%22The_Rock%22_Johnson_Visits_the_Pentagon_%2841%29_%28cropped%29.jpg"
                    alt="cast"
                    className="object-cover w-full h-full object-top transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mt-2">
                <div className="text-white text-left">
                    <p className="text-sm line-clamp-1">Keanu Reeves</p>
                    <p className="text-xs italic text-white/70 line-clamp-1">John Wick</p>
                </div>
            </div>
        </div>
    )
}
export default CastCarouselItem;