import React from "react";
type Props = {
    cast: any,
    designation?: string
}
const CastCarouselItemMobile = ({
    cast,
    designation
}:Props) => {
    const thumb = cast?.imageUrl || cast?.imageThumbnailMedium || '';
    return (
        <div className="group relative w-[180px] max-w-full min-w-[180px] mr-4 pb-2">
            <div className="aspect-[2/3] overflow-hidden rounded-md bg-zinc-800">
                {(thumb)&&(
                    <img
                        src={thumb}
                        alt={cast?.fullname}
                        className="object-cover w-full h-full object-top"
                    />
                )}
            </div>
            <div className="mt-2">
                <div className="text-white text-left">
                    {(cast?.fullname)&&(
                        <p className="text-sm line-clamp-1">{cast.fullname}</p>
                    )}
                    {(designation)&&(
                        <p className="text-xs italic text-white/70 line-clamp-1">{designation}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
export default CastCarouselItemMobile;