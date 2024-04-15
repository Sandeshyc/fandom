export const getThumbnailPortrait = (data:any) => {
    const url = data?.thumbnailPortrait || data?.thumbnailBannerUrl || data?.thumbnailPortraitUrl || data?.thumbnailLandscapeUrl || data?.thumbnailUrl || '';
    return url;
}