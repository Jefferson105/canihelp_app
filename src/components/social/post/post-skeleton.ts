import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const postSkeleton: Array<any> = [
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        children: [
            {
                width: 40,
                height: 40,
                borderRadius: 40
            },
            {
                marginTop: 8,

                children: [
                    {
                        width: 100,
                        height: 16,
                        marginLeft: 10,
                        marginTop: -4
                    },
                    {
                        width: 60,
                        height: 16,
                        marginLeft: 10,
                        marginTop: 4
                    }
                ]
            }
        ]
    },
    {
        width: '100%',
        height: 340,
        marginTop: 12
    },
    {
        marginTop: 8,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        children: [
            {
                width: 34,
                height: 24
            },

            {
                width: 34,
                height: 24,
                marginLeft: 20
            },
            {
                width: 34,
                height: 24,
                marginLeft: width - 164
            }
        ]
    },
    {
        width: '90%',
        height: 20,
        marginTop: 8
    },

    {
        marginTop: 16,
        width: '90%',
        flexDirection: 'row',
        children: [
            {
                width: '12%',
                height: 20,
                marginTop: 4,
                marginBottom: 10
            }
        ]
    },
    {
        marginTop: 4,

        width: '90%',
        flexDirection: 'column',
        children: [
            {
                width: '24%',
                height: 20
            },
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
                        width: '100%',
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
                    }
                ]
            },
            {
                width: '90%',
                marginTop: 8,
                height: 20
            }
        ]
    }
];

export default postSkeleton;
