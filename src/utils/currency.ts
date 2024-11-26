export const parseCurrency = (value: string) => {
    if (value.length < 3) {
        value = [...Array(3 - value.length)].map(() => '0').join('') + value;
    }

    const finalVal = value.slice(0, value.length - 2) + ',' + value.slice(-2);

    return finalVal.replace('.', '');
};

export const joinNumberInput = (value: string): string => {
    const joinNumber = value
        .split('')
        .filter((n) => Number.isInteger(Number(n)))
        .join('');

    return String(Number(joinNumber) || 0);
};

export const currencyToFloat = (num: string) => {
    return parseFloat(num.slice(0, num.length - 2) + '.' + num.slice(-2));
};
