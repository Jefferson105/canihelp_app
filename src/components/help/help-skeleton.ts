import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const helpCard = {
    marginTop: 4,
    width: '90%',
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
                { width: 120, height: 12, marginLeft: 4 },

                {
                    width: 40,
                    height: 12,
                    marginLeft: width - 204
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

const helpSkeleton: Array<any> = [
    {
        width: 224,
        height: 28,
        marginTop: 20
    },
    {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 18,
        children: [
            { width: 94, height: 16 },

            { width: 94, height: 16, marginLeft: 8 }
        ]
    }
];
const fill = () => {
    //space without header
    const space = height - 82;
    //how many slots will fill the space
    const possibleSlots = Math.ceil(space / 100.0);

    for (let i = 0; i < possibleSlots; i++) {
        helpSkeleton.push(helpCard);
    }
};

fill();
export default helpSkeleton;
