const rattingCard = {
    marginTop: 16,
    width: '90%',
    flexDirection: 'column',
    children: [
        {
            width: '40%',
            height: 28
        },
        {
            width: '100%',
            height: 44,
            marginTop: 4
        }
    ]
};

const reviewSkeleton: Array<any> = [
    {
        width: 56,
        height: 56,
        borderRadius: 56,
        marginTop: 20
    },

    {
        width: '60%',
        height: 32,
        marginTop: 8
    },
    {
        width: '90%',
        height: 20,
        marginTop: 16
    },
    {
        width: '80%',
        height: 20,
        marginTop: 8
    },
    {
        width: '90%',
        height: 0.8,
        marginTop: 16,
        marginBottom: 8
    }
];
const desc = {
    marginTop: 20,
    width: '100%',

    children: [
        {
            width: '100%',
            flexDirection: 'row',
            children: [
                {
                    width: '40%',
                    height: 28
                },
                {
                    width: '20%',
                    height: 28,
                    marginLeft: '30%'
                }
            ]
        },
        { marginTop: 36, width: '40%', height: 16 },
        { marginTop: 10, width: '90%', height: 160, marginBottom: 60 }
    ]
};

const fill = () => {
    const rattingSlots = 6;

    for (let i = 0; i < rattingSlots; i++) {
        reviewSkeleton.push(rattingCard);
        if (i === 5) {
            reviewSkeleton.push(desc);
        }
    }
};

fill();
export default reviewSkeleton;
