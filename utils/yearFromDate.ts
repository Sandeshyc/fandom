// get year from date string
export const yearFromDate = (date: string): number => {
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