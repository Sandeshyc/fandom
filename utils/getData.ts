export const getThumbnailPortrait = (data:any) => {
    const url = data?.thumbnailPortrait || data?.thumbnailPortraitUrl || data?.thumbnailBannerUrl || data?.thumbnailLandscapeUrl || data?.thumbnailUrl || '';
    return url;
}

export const getThumbnailLandscape = (data:any) => {
    const url = data?.thumbnailLandscapeUrl || data?.thumbnailUrl || data?.thumbnailBannerUrl || data?.thumbnailPortraitUrl || data?.thumbnailPortrait || '';
    return url;
}

export const getThumbnailBanner = (data:any) => {
    const url = data?.thumbnailBannerUrl || data?.thumbnailLandscapeUrl || data?.thumbnailUrl || data?.thumbnailPortrait || data?.thumbnailPortraitUrl || '';
    return url;
}

export const getAllowedItems = (entitlementInfo:any) => {
    let fullAllowedItems = [] as any;
    const entitleInfo = entitlementInfo?.entitlementInfo;
    if(entitleInfo){
        entitleInfo.forEach((info:any) => {
            const tempItem = info;
            if(tempItem){
                fullAllowedItems.push(tempItem);
            }
        })
    }
    return fullAllowedItems;
};
export const getAllowedItemsId = (entitlementInfo:any) => {
    let fullAllowedItemsId = [] as any;
    const entitleInfo = entitlementInfo?.entitlementInfo;
    if(entitleInfo){
        entitleInfo.forEach((info:any) => {
            const tempId = info?.content?.contentId;
            if(tempId){
                fullAllowedItemsId.push(tempId);
            }
        })
    }
    return fullAllowedItemsId;
};
