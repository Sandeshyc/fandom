// get year from date string
export const yearFromDate = (date: string): number => {
    // IF date is not a string or undefined, return current year
    if (typeof date !== 'string' || date === undefined) {
        return new Date().getFullYear();
    }
    
    const year = new Date(date).getFullYear();

    // if year not a number, split date string and get year (lenth 4) [temp fix for non standard date format]
    if (isNaN(year)) {
        // split date string 
        const dateArr = date.split('/');
        // get year from date string
        const year = dateArr.filter((item) => item.length === 4);
        // return year as number
        return parseInt(year[0]);
    }
    return year;
}


// convert expire date to left days
export const dateToDay = (expireDate: any) => {
    const today = new Date();
    const expire = new Date(expireDate);
    // console.log('expireDate : ', expire)
    const diffTime = expire.getTime() - today.getTime();
    if(diffTime <= 0){
        return {day: 0, hour: 0, minute: 0}
    }
    const oneDay = 1000 * 86400; // (1000 * 60 * 60 * 24)
    const oneHour = 1000 * 3600; // (1000 * 60 * 60)
    const oneMinute = 1000 * 60; // (1000 * 60)

    const diffDays = Math.floor(diffTime / oneDay); // days (1000 * 60 * 60 * 24)
    const remainMS = diffTime % oneDay;
    const diffHours = Math.floor(remainMS / oneHour); // hours (1000 * 60 * 60)
    const remainMS2 = remainMS % oneHour;
    const diffMinutes = Math.ceil(remainMS2 / oneMinute); // minutes (1000 * 60)

    return {day: diffDays, hour: diffHours, minute: diffMinutes}


    //const diffDays = Math.ceil(diffTime / (1000 * 86400)); // days (1000 * 60 * 60 * 24)
    //return diffDays;
  }