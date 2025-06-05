export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

export const formatDecimal = (value: number | undefined): string => {
    if (value === undefined || value === null) {
        return 'N/A';
    }
    return value.toFixed(2);
};