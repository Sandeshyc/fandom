// make first latter of each word capital
export const capFirstLetter = (str: string) => {
    return str?
        .split(' ')?
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
    }

    