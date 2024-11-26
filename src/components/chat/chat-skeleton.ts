import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//space without header
const space = height - 48;
//how many slots will fill the space
const possibleSlots = Math.ceil(space / 90.8);

export const chatSkeleton: Array<any> = [
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        children: [
            {
                width: 72,
                height: 28
            }
        ]
    },
    ...[...Array(possibleSlots)].map(() => ({
        marginTop: 4,
        width: '100%',
        flexDirection: 'column',
        children: [
            {
                marginTop: 16,
                width: '100%',
                flexDirection: 'row',
                children: [
                    {
                        width: 40,
                        height: 40,
                        borderRadius: 40
                    },
                    {
                        width: width - 140,
                        marginLeft: 8,
                        flexDirection: 'column',
                        children: [
                            {
                                width: '34%',
                                height: 16
                            },
                            {
                                width: '16%',
                                marginTop: 4,
                                height: 16
                            }
                        ]
                    },
                    {
                        width: 52,
                        height: 12
                    }
                ]
            },
            {
                marginTop: 12,
                width: '100%',
                flexDirection: 'row',
                children: [
                    { width: 42, height: 12, marginLeft: 4 },

                    {
                        width: 26,
                        height: 12,
                        marginLeft: width - 140
                    }
                ]
            },

            {
                width: '90%',
                height: 0.8,
                marginTop: 12
            }
        ]
    }))
];

//space without header
const spaceMessages = height - 80;
//how many slots will fill the space
const possibleMessages = Math.ceil(spaceMessages / 80);

export const messagesSkeleton: Array<any> = [
    {
        width: width - 20,
        marginLeft: 10,
        paddingRight: 30,
        flexDirection: 'column',
        children: [...Array(possibleMessages)].map((_, i) => ({
            width: '50%',
            height: 50,
            marginTop: 15,
            borderRadius: 10,
            marginLeft: i % 2 === 0 ? 'auto' : 0
        }))
    }
];

export const footerSkeleton: Array<any> = [
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 10,
        children: [
            {
                width: '70%',
                height: 40
            },
            {
                marginLeft: '2%',
                width: 28,
                height: 28,
                borderRadius: 28
            },
            { marginLeft: '2%', width: 28, height: 28, borderRadius: 28 },
            { marginLeft: '1%', width: 42, height: 42, borderRadius: 42 }
        ]
    }
];
