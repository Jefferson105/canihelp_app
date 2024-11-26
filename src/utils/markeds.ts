export const fillMarking = ({ text, selection, item }) => {
    // Text part until cursor
    let part1: string = text.slice(0, selection);
    // position of last at sign
    const indexAt: number = part1.lastIndexOf('@');

    // combine text up to the last at sign and username
    part1 = part1.slice(0, indexAt + 1) + item.UserName;

    // Second part of text
    const part2 = text.slice(selection, text.length);

    // return two parts
    return { part1, part2 };
};

export const parseSelection = ({ text, selection }) => {
    // Select text from start until cursor position
    const untilSelect = text.slice(0, selection.start);

    // Check if has a '@' in text; Proceed only if has
    if (untilSelect.indexOf('@') === -1) return null;

    // get text after the last '@'
    const user = untilSelect.split('@').slice(-1)[0];

    // check if has more than 1 word after of '@'
    if (user.split(' ').length > 1) {
        return null;
    }

    // check there is no text after '@'
    if (!user || user === '') {
        return '';
    }

    return user;
};
