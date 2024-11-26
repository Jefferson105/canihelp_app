import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const profileSkeleton: Array<any> = [
    {
        marginLeft: -20,
        width: '110%',
        height: 210,
        marginBottom: 10
    },
    {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        children: [
            {
                width: 80,
                height: 80,
                borderRadius: 80
            },
            {
                marginLeft: 8,
                marginTop: 4,
                width: '100%',
                children: [
                    {
                        width: '40%',
                        height: 20
                    },
                    {
                        marginTop: 4,
                        width: '30%',
                        height: 20
                    }
                ]
            }
        ]
    },
    {
        marginTop: 12,
        flexDirection: 'row',
        width: '100%',
        children: [
            {
                width: '18%',
                height: 20,
                borderRadius: 10
            },
            {
                marginLeft: '2%',
                width: '18%',
                height: 20,
                borderRadius: 10
            },
            {
                marginLeft: '2%',
                width: '18%',
                height: 20,
                borderRadius: 10
            },
            {
                marginLeft: '2%',
                width: '18%',
                height: 20,
                borderRadius: 10
            },
            {
                marginLeft: '2%',
                width: '18%',
                height: 20,
                borderRadius: 10
            }
        ]
    },
    {
        marginTop: 12,
        flexDirection: 'row',
        width: '98%',
        height: 60,
        borderRadius: 10
    },
    {
        width: '24%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 8,
        flexDirection: 'column',
        width: '100%',
        children: [
            {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                children: [
                    {
                        width: 36,
                        height: 36
                    },
                    {
                        width: '78%',
                        height: 40,
                        marginLeft: 20
                    }
                ]
            },
            {
                marginTop: 8,
                alignItems: 'center',
                flexDirection: 'row',
                children: [
                    {
                        width: 36,
                        height: 36
                    },
                    {
                        width: '78%',
                        height: 40,
                        marginLeft: 20
                    }
                ]
            }
        ]
    },
    {
        width: '22%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 12,
        width: '100%',
        height: 80
    },
    {
        width: '20%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 12,
        width: '100%',
        height: 80
    },
    {
        width: '60%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 8,
        flexDirection: 'column',
        width: '100%',
        children: [
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
                        width: width - 140,
                        height: 20,
                        marginLeft: 20
                    },
                    {
                        width: 30,
                        height: 20,
                        marginLeft: 10
                    }
                ]
            },
            {
                marginTop: 8,
                alignItems: 'center',
                flexDirection: 'row',
                children: [
                    {
                        width: 40,
                        height: 40,
                        borderRadius: 40
                    },
                    {
                        width: width - 140,
                        height: 20,
                        marginLeft: 20
                    },
                    {
                        width: 30,
                        height: 20,
                        marginLeft: 10
                    }
                ]
            }
        ]
    },
    {
        width: '40%',
        height: 20,
        marginTop: 12
    },
    {
        marginTop: 8,
        flexDirection: 'column',
        width: '100%',
        children: [
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
                        width: width - 140,
                        height: 20,
                        marginLeft: 20
                    },
                    {
                        width: 30,
                        height: 20,
                        marginLeft: 10
                    }
                ]
            },
            {
                marginTop: 8,
                alignItems: 'center',
                flexDirection: 'row',
                children: [
                    {
                        width: 40,
                        height: 40,
                        borderRadius: 40
                    },
                    {
                        width: width - 140,
                        height: 20,
                        marginLeft: 20
                    },
                    {
                        width: 30,
                        height: 20,
                        marginLeft: 10
                    }
                ]
            }
        ]
    },
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
        width: '91%',
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

export default profileSkeleton;
