import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const storiesSkeleton: Array<any> = [
    {
        width: '100%',
        flexDirection: 'row',
        children: [
            {
                width: width - 40,
                height: 20,
                marginTop: 12
            }
        ]
    },
    {
        marginTop: 25,
        width: '100%',
        flexDirection: 'row',
        children: [...Array(5)].map(() => ({
            width: 64,
            height: 64,
            marginRight: 22,
            borderRadius: 64
        }))
    }
];

export const postsSkeleton: Array<any> = [
    {
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
                        width: width - 120,
                        marginLeft: 8,
                        flexDirection: 'column',
                        children: [
                            {
                                width: '24%',
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
                        width: 26,
                        height: 12,
                        borderRadius: 40
                    }
                ]
            },
            {
                width: '100%',
                marginTop: 8,
                height: 340
            },
            {
                marginTop: 15,
                width: '100%',
                height: 20
            },
            {
                marginTop: 15,
                width: '100%',
                flexDirection: 'row',
                children: [
                    {
                        height: 30,
                        width: 30,
                        borderRadius: 30
                    },
                    {
                        height: 30,
                        width: 30,
                        borderRadius: 30,
                        marginLeft: 20
                    },
                    {
                        height: 30,
                        width: 30,
                        borderRadius: 30,
                        marginLeft: 20
                    }
                ]
            }
        ]
    }
];

export const socialSkeleton: Array<any> = [
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        children: [
            {
                width: 84,
                height: 28
            },
            {
                width: 80,
                height: 28,
                marginLeft: width - 280
            },
            {
                width: 28,
                height: 28,
                marginLeft: 10
            },
            {
                width: 28,
                height: 28,
                marginLeft: 10
            }
        ]
    },
    ...storiesSkeleton,
    ...postsSkeleton
];
