const generateColor = (str: string): string => {
    const hashCode = str.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const hue = hashCode % 360;
    const saturation = 70;
    const lightness = 80;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export {generateColor};