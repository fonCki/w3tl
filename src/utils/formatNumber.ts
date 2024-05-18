/**
 * Formats a number into a human-readable format.
 *
 * @param {number} num - The number to be formatted.
 * @returns {string} The formatted number.
 */
const formatNumber = (num:number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

export default formatNumber;
