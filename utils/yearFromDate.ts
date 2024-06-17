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
    if (diffTime <= 0) {
        return { day: 0, hour: 0, minute: 0 }
    }
    const oneDay = 1000 * 86400; // (1000 * 60 * 60 * 24)
    const oneHour = 1000 * 3600; // (1000 * 60 * 60)
    const oneMinute = 1000 * 60; // (1000 * 60)

    const diffDays = Math.floor(diffTime / oneDay); // days (1000 * 60 * 60 * 24)
    const remainMS = diffTime % oneDay;
    const diffHours = Math.floor(remainMS / oneHour); // hours (1000 * 60 * 60)
    const remainMS2 = remainMS % oneHour;
    const diffMinutes = Math.ceil(remainMS2 / oneMinute); // minutes (1000 * 60)

    return { day: diffDays, hour: diffHours, minute: diffMinutes }


    //const diffDays = Math.ceil(diffTime / (1000 * 86400)); // days (1000 * 60 * 60 * 24)
    //return diffDays;
}


export const getDateFormat = (date: string) => {
    const datex = new Date(date);
    const formattedDate = datex.toLocaleDateString('en-GB');
    return formattedDate;
}

export const formatDateRange = (startDate: string, endDate: string): string => {
    const formatDate = (dateString: string): string => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
}

export const convertESTtoLocalTime = (estDateTimeString: string) => {
    const date = new Date(estDateTimeString);

    // Get options for desired formatting
    const options = {
        weekday: 'short',  // Tue
        year: 'numeric',  // 2024
        month: 'short',   // Apr
        day: 'numeric',   // 09
        hour: 'numeric',   // 20 (24-hour format)
        minute: 'numeric', // 16
        hour12: true,     // Use 12-hour format (8 PM)    
    };
    // Format the date-time string using the options
    const formattedDateTime = date.toLocaleDateString('en-US', options as Intl.DateTimeFormatOptions);

    return formattedDateTime;
}

export const getTimeDifference = (date1: Date, date2?: Date) => {
    if (!date2) {
        date2 = new Date();
    }
    if (!date1) {
        return { day: 0, hour: 0, minute: 0 }
    }
    date1 = new Date(date1);
    const diffTime = date2?.getTime() - date1?.getTime();
    const oneDay = 1000 * 86400; // (1000 * 60 * 60 * 24)
    const oneHour = 1000 * 3600; // (1000 * 60 * 60)
    const oneMinute = 1000 * 60; // (1000 * 60)

    const diffDays = Math.floor(diffTime / oneDay); // days (1000 * 60 * 60 * 24)
    const remainMS = diffTime % oneDay;
    const diffHours = Math.floor(remainMS / oneHour); // hours (1000 * 60 * 60)
    const remainMS2 = remainMS % oneHour;
    const diffMinutes = Math.ceil(remainMS2 / oneMinute); // minutes (1000 * 60)

    return { day: diffDays, hour: diffHours, minute: diffMinutes }
}