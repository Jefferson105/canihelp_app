import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const notificationCard = {
    marginTop: 4,
    width: '90%',
    flexDirection: 'column',
    children: [
        {
            marginTop: 18,
            width: '100%',
            flexDirection: 'row',
            children: [
                {
                    width: 40,
                    height: 40,
                    borderRadius: 40
                },
                {
                    width: '76%',
                    marginLeft: 8,
                    flexDirection: 'column',
                    children: [
                        {
                            width: '60%',
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
            width: width - 40,
            height: 0.8,
            marginTop: 8
        }
    ]
};

const notificationSkeleton: Array<any> = [
    {
        marginTop: 28,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        children: [
            {
                width: 120,
                height: 28
            },

            {
                width: 80,
                height: 12,
                marginLeft: width - 240
            }
        ]
    }
];
const fill = () => {
    //space without header
    const space = height - 56;
    //how many slots will fill the space
    const possibleSlots = Math.ceil(space / 80.0);

    for (let i = 0; i < possibleSlots; i++) {
        notificationSkeleton.push(notificationCard);
    }
};

fill();
export default notificationSkeleton;
