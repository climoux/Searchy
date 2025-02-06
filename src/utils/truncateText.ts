const truncateTextAtLastDot = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastPeriodIndex = truncated.lastIndexOf(".");

    if (lastPeriodIndex !== -1) {
        return truncated.slice(0, lastPeriodIndex + 1).trim();
    }

    return truncated.trim();
};

export {
    truncateTextAtLastDot
}