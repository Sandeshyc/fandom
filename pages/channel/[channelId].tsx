import React, { useEffect, useState } from 'react';
import ChannelDetails from '@/modules/components/ChannelDetails';
import ChannelPlayer from '@/modules/components/ChannelPlayer';
const data = {
    "__typename": "Content",
    "_id": "660e04fa86d019718e4bac3e",
    "assetId": "660e04fa86d019718e4bac3e",
    "trailerUrl": "https://abs-vcms.akamaized.net/a62df610-3e00-4dde-87f8-f346ad2b1b6b/preview/Karnal_15_0116_WMK-165251.mp4",
    "thumbnailBannerUrl": "https://qa-static2.abs-cbn.com/a62df610-3e00-4dde-87f8-f346ad2b1b6b/Thumbnails/Karnal20Thumbnail2.png",
    "thumbnailUrl": "https://qa-static2.abs-cbn.com/a62df610-3e00-4dde-87f8-f346ad2b1b6b/Thumbnails/Karnal20Thumbnail.png",
    "thumbnailPortraitUrl": "https://qa-static2.abs-cbn.com/a62df610-3e00-4dde-87f8-f346ad2b1b6b/Thumbnails/Karnal20Thumbnail2.png",
    "thumbnailPortrait": "https://qa-static2.abs-cbn.com/a62df610-3e00-4dde-87f8-f346ad2b1b6b/Thumbnails/Karnal20Thumbnail2.png",
    "thumbnailLandscapeUrl": "https://qa-static2.abs-cbn.com/a62df610-3e00-4dde-87f8-f346ad2b1b6b/Thumbnails/Karnal20Thumbnail.png",
    "publishSchedule": "2024-04-06T04:00:00.000Z",
    "releaseDate": "1983-12-25T05:00:00.000Z",
    "title": "ABCD",
    "contentRating": "R-18",
    "quality": null,
    "genre": [
        "Drama"
    ],
    "cast": [
        "Philip Salvador",
        "Vic Silayan",
        "Charito Solis",
        "Cecille Castillo"
    ],
    "writer": "",
    "director": "Marilou Diaz-Abaya",
    "description": "A young man takes his new wife to live with him in his father's house. But conflict soon arises when the father notices that his new daughter-in-law resembles his dead wife, and begins to lust for her.\n",
    "allowedPlans": [
        {
        "__typename": "Plan",
        "id": "plan_sku00000",
        "name": "FREE",
        "currency": null,
        "description": "Free movies",
        "price": null,
        "priceSKU": "plan_sku00000",
        "googlePriceSKU": "iwt_sku00000"
        }
    ],
    "messages": null,
    "allowed": {
        "__typename": "PlayRentBtns",
        "allowed": true,
        "canPlay": true,
        "canBuy": true,
        "bought": false,
        "message": ""
    },
    "isPackage": false,
    "isInWatchList": false,
    "currentTime": null,
    "videoDuration": null,
    "hlsVideo": "https://abs-vcms.akamaized.net/a62df610-3e00-4dde-87f8-f346ad2b1b6b/hls/Karnal_15_0116_WMK-165251.m3u8",
    "dashVideo": "https://abs-vcms.akamaized.net/a62df610-3e00-4dde-87f8-f346ad2b1b6b/dash/Karnal_15_0116_WMK-165251.mpd",
    "videoUrl": "https://abs-vcms.akamaized.net/a62df610-3e00-4dde-87f8-f346ad2b1b6b/preview/Karnal_15_0116_WMK-165251.mp4",
    "trailerVideo": "https://abs-vcms.akamaized.net/a62df610-3e00-4dde-87f8-f346ad2b1b6b/preview/Karnal_15_0116_WMK-165251.mp4",
    "onAirDate": "2024-04-03T04:00:00.000Z"
}
const Channel = () => {
    return (
        <div className="text-white bg-gradient-to-b from-[#050505] via-[#1E1E1E] to-[#000000]"
        style={{
            // backgroundImage: bgImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            backgroundPosition: 'right '+ 30 + '%',
        }}>
        <ChannelPlayer data={data}/>
        <ChannelDetails data={data}/>
        </div>
    );
}
export default Channel;