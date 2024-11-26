export function getFormatedDate(date) {
    const dateToFormat = new Date(date);
    return `${String(dateToFormat.getDate()).padStart(2, '0')}/${String(
        dateToFormat.getMonth() + 1
    ).padStart(2, '0')}/${dateToFormat.getFullYear()}`;
}

export function getFormatedTime(date) {
    const timeToFormat = new Date(date);
    return `${String(timeToFormat.getHours()).padStart(2, '0')}:${String(
        timeToFormat.getMinutes()
    ).padStart(2, '0')}`;
}

export function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

export const dateWithoutHour = (date: Date) => {
    return `
        ${String(date.getDate()).padStart(2, '0')}/${String(
            date.getMonth() + 1
        ).padStart(2, '0')}/${date.getFullYear()}
    `;
};

export const formatDate = (date) => {
    const newDate = new Date(date);
    const timeNow = new Date();

    const messageDay = newDate.getDate();
    const dayNow = timeNow.getDate();
    const month = String(newDate.getMonth() + 1);
    const year = newDate.getFullYear();

    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();

    if (dayNow - messageDay >= 1)
        return `${String(messageDay).padStart(2, '0')}/${month.padStart(
            2,
            '0'
        )}/${year}`;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
    )} ${hours > 2 ? 'PM' : 'AM'}`;
};
