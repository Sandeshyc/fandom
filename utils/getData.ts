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