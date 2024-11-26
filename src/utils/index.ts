import { Alert, Dimensions } from 'react-native';

import { IUser } from '@ts/interfaces/user';

const { width } = Dimensions.get('window');

export const parseRating = (
    rating: any,
    type: 'Professional' | 'Client'
): string => {
    if (!rating) return null;

    if (typeof rating === 'number' || typeof rating === 'string')
        return Number(rating).toFixed(2);

    if (!rating[type]) return null;

    return rating[type].Average.toFixed(2);
};

export const replaceSpecialChars = (value: string) => {
    if (!value) return value;

    let str = value?.toString();
    str = str?.replace(/[ÀÁÃÄÂ]/g, 'A');
    str = str?.replace(/[àáãâä]/g, 'a');
    str = str?.replace(/[ÈÉÊË]/g, 'E');
    str = str?.replace(/[èéêë]/g, 'e');
    str = str?.replace(/[ÌÍÎÏ]/g, 'I');
    str = str?.replace(/[ìíîï]/g, 'i');
    str = str?.replace(/[ÒÓÔÕÖ]/g, 'O');
    str = str?.replace(/[òóôõö]/g, 'o');
    str = str?.replace(/[ÙÚÛŨÜ]/g, 'U');
    str = str?.replace(/[ùúûũü]/g, 'u');
    str = str?.replace(/[Ç]/g, 'C');
    str = str?.replace(/[ç]/g, 'c');

    return str;
};

const week = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Set',
    'Out',
    'Nov',
    'Dez'
];

export const paddingNumber = (n: number | string) => {
    if (String(n).length === 1) return '0' + n;

    return n;
};

export const chatDate = (date: Date | string) => {
    let newDate: Date | string | number = new Date(date);

    newDate = `${paddingNumber(week[newDate.getDay()])}, ${paddingNumber(
        months[newDate.getMonth()]
    )} ${paddingNumber(newDate.getDate())}`;

    return newDate;
};

export const timeParse = (date: Date | string) => {
    const newDate = new Date(date);
    const now = new Date();

    const timePassed = Number(now) - Number(newDate);

    const seconds = timePassed / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;

    if (days > 1) {
        return chatDate(date);
    }

    if (hours > 1) {
        return `há ${Math.floor(hours)} hrs`;
    }

    if (minutes > 1) {
        return `há ${Math.floor(minutes)} min`;
    }

    return 'agora'; //`${Math.floor(seconds)} s`;
};

export const showError = (error: string, root = '') => {
    const title =
        error === 'Connection timeout'
            ? 'Verifique sua conexão'
            : 'Ocorreu um erro';

    const message =
        error === 'Connection timeout'
            ? 'Sinal de internet fraco ou sem conexão.'
            : 'Tente novamente ou entre em contato com o administrador.';

    Alert.alert(title, `${message} ${root}`);
};

export const removeRepeatedObject = (arr: Array<any>) => {
    const objArr = {};

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        objArr[item._id] = item;
    }

    return Object.values(objArr);
};

export const suggestionMarked = (
    text: string,
    select: number,
    users,
    markeds
) => {
    const parse = text.slice(0, select);

    if (parse.indexOf('@') === -1) return [];

    const user = parse.split('@').slice(-1)[0];

    return users.filter(
        (u) =>
            u?.UserName?.toLowerCase()?.includes(user?.toLowerCase()) &&
            markeds?.indexOf(u._id) === -1
    );
};

export const userCategory = (user: IUser, help?: boolean) => {
    if (!user) return null;

    if (user.MainCategory) {
        if (user.MainCategory.Label) {
            return user.MainCategory.Label;
        }
        return user.MainCategory.Name;
    }

    if (Array.isArray(user.Categories) && user.Categories.length) {
        const primaryCategory = user.Categories.find(
            ({ IsPrimary }) => !!IsPrimary
        );
        if (!primaryCategory) return null;
        return help
            ? primaryCategory.Category.Name
            : primaryCategory.Label
              ? primaryCategory.Label
              : primaryCategory.Category.Name;
    }

    return null;
};

export const numberFormatter = (num) => {
    if (num < 10) {
        return `0${num}`;
    } else if (num >= 1000) {
        return `${String(num).slice(0, -3)}K`;
    } else if (num >= 10000) {
        return `${String(num).slice(0, -4)}K`;
    } else if (num >= 100000) {
        return `${String(num).slice(0, -5)}K`;
    } else {
        return String(num);
    }
};

export const checkConnect = (isConnected, fn) => {
    if (!isConnected) {
        Alert.alert(
            'Verifique sua conexão',
            'Sinal de internet fraco ou sem conexão.'
        );
        return;
    }

    fn();
};

export const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const getTimeString = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    return `${h > 0 ? String(h).padStart(2, '0') + ':' : ''}${String(
        m
    ).padStart(1, '0')}:${String(s).padStart(2, '0')}`;
};

export const deviceSize = () => {
    if (width < 375) {
        // Device size < 4.5'
        return 'Small';
    } else if (width < 410) {
        // Device size < 5'
        return 'Mediun';
    } else {
        // Device size >= 5'
        return 'Normal';
    }
};

interface ITextLine {
    text: string;
    fontWidth?: number;
    extraSpace?: number;
}

export const amountTextLines = ({
    text,
    fontWidth = 7.5,
    extraSpace = 40
}: ITextLine) => {
    const itemWidth = width - extraSpace;

    const letterPerline = Math.ceil(itemWidth / fontWidth);

    const textLines = text?.split('\n') || [];
    let lines = 0;

    for (const txt of textLines) {
        lines += Math.ceil(txt.length / letterPerline) || 1;
    }

    return lines;
};

export const isCheckInExpirated = (date) => {
    const postMinutes = Number(new Date(date));
    const todayMinutes = Number(new Date());

    const minutesDir = (todayMinutes - postMinutes) / 1000 / 60;

    return 30 - minutesDir < 1;
};

export const getArrByNum = (start: number, end: number) => {
    const arr = [];

    for (let i = start; i <= end; i++) {
        arr.push(i);
    }

    return arr;
};
