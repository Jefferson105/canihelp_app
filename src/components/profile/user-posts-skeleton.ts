import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const uPostsSkeleton = [
    {
        width: '16%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 8,
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
                width: width - 110,
                marginTop: 8,

                children: [
                    {
                        width: '40%',
                        height: 16,
                        marginLeft: 10,
                        marginTop: -4
                    },
                    {
                        width: '20%',
                        height: 16,
                        marginLeft: 10,
                        marginTop: 4
                    }
                ]
            },
            {
                width: 30,
                height: 20
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
                marginLeft: width - 160
            }
        ]
    },
    {
        width: '100%',
        height: 20,
        marginTop: 12
    },
    {
        width: '12%',
        height: 20,
        marginTop: 4,
        marginBottom: 20
    }
];

export default uPostsSkeleton;
