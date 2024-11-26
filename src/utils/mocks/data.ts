//Context
const MOCK_CONTEXT = {
    categories: [
        {
            Description: 'Teste 1',
            Label: null,
            Level: 2,
            Name: 'Teste 1',
            ParentID: 'teste1',
            Search: null,
            Styles: [Object],
            Type: 'default',
            _id: 'teste1'
        },
        {
            Description: 'Teste 2',
            Label: null,
            Level: 2,
            Name: 'Teste 2',
            ParentID: 'testFatherID',
            Search: null,
            Styles: [Object],
            Type: 'default',
            _id: 'teste2'
        },
        {
            Description: 'Teste 3',
            Label: null,
            Level: 0,
            Name: 'Teste 3',
            ParentID: 'testFatherID',
            Search: null,
            Styles: [Object],
            Type: 'default',
            _id: 'teste3'
        },
        {
            Description: '2222222',
            Label: null,
            Level: 2,
            Name: '2222222',
            ParentID: 'testFatherID',
            Search: null,
            Styles: [Object],
            Type: 'default',
            _id: 'teste4'
        }
    ],
    helpsProgress: {
        list: [
            {
                Category: {
                    Description: 'Microondas',
                    Label: null,
                    Name: 'Microondas',
                    _id: '5e8e288ae28535356c3313a3'
                },
                CreatedAt: '2022-01-10T20:04:19.781Z',
                Creator: {
                    Email: 'enzo6@octupus.me',
                    MainCategory: { CategoryID: 'teste', Label: 'Chaveiro' },
                    Name: 'testeSent',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1638294466470-db949f45-cc5a-4339-8222-ad39905e929f.jpg',
                    Rating: null,
                    UserName: 'enzo6',
                    Verified: 'not_verified',
                    _id: 'testeoctopus'
                },
                Description: 'aa',
                DisplayLocation:
                    'Rua Casa do Ator, Vila Olímpia - São Paulo / SP',
                Group: 'general',
                Label: null,
                Location: { Lat: -23.5983417, Lon: -46.6801419 },
                MyProposal: ['teste'],
                Proposal: null,
                ProposalSelected: 'teste',
                Provider: 'enzo5',
                ProviderStatus: 'finish_confirmated',
                Readers: ['enzo5'],
                Recents: [
                    {
                        MainCategory: null,
                        Name: null,
                        Photo: null,
                        UserName: null,
                        _id: null
                    }
                ],
                ShortLocation: null,
                Transport: null,
                Type: 'default',
                UnreadProposals: null,
                UpdatedAt: '2022-01-10T20:04:19.781Z',
                Urgency: 'urgent',
                _id: 'testeID'
            }
        ],
        mutate: jest.fn(),
        pagination: undefined
    },
    post: {
        list: [
            {
                Address: null,
                CheckIn: false,
                Comments: 2,
                CreatedAt: '2022-01-12T16:20:50.960Z',
                Distance: 50,
                Help: null,
                Images: [],
                Liked: false,
                Likes: 1,
                Location: { Lat: -23.5539749, Lon: -46.655794 },
                Markeds: [],
                Read: false,
                Readers: [],
                SmallImage: null,
                Text: 'TEXTO DE TESTE',
                UpdatedAt: '2022-01-12T16:20:50.960Z',
                User: {
                    Email: 'enzo32@octupus.me',
                    MainCategory: {
                        CategoryID: '5e8e288ae28535356c33125f',
                        IsPrimary: true,
                        Label: 'Teste Bot'
                    },
                    Name: 'teste tab',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                    Rating: 5,
                    UserName: 'enzo32',
                    Verified: 'under_analysis',
                    _id: 'testeID'
                },
                Videos: [],
                _id: 'testeID'
            }
        ],
        mutate: jest.fn(),
        pagination: undefined
    },
    posts: {
        category: false,
        distance: 50,
        filter: false,
        from: 'map',
        hasNewPost: false,
        help: false,
        list: [],
        location: {
            address: {
                City: 'Caeté',
                Country: 'BR',
                Neighborhood: null,
                PostCode: '34800000',
                State: 'MG',
                Street: 'Rua Antônio dos Santós'
            },
            displayName: 'Rua Antônio dos Santós, Caeté / MG 34800000',
            latitude: '-19.87716673078154',
            longitude: '-43.64383405074477'
        },
        next: true,
        notification: false,
        page: 0
    },
    proposal: {
        list: [
            {
                Description: '522',
                Finish: '2022-01-27T18:50:32.539Z',
                HelpID: '61bcffbe649f5fc55f8a0b50',
                Location: {
                    Address:
                        'Rua Conceição Costa, Pindorama - Belo Horizonte / MG 30865020',
                    Lat: -19.90705,
                    Lon: -44.017981
                },
                Name: 'Microondas',
                Price: 10,
                Start: '2022-01-26T23:59:58.998Z',
                Status: 'sent',
                User: {
                    Email: 'enzo5@octupus.me',
                    MainCategory: {
                        CategoryID: 'testeID',
                        IsPrimary: true,
                        Label: 'Microondas'
                    },
                    Name: 'teste cinco',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
                    Rating: 5,
                    UserName: 'enzo5',
                    Verified: 'under_analysis',
                    _id: 'enzo5'
                },
                _id: 'testProposal'
            }
        ],
        mutate: jest.fn(),
        pagination: undefined
    },
    proposals: {
        list: [
            {
                Description: ' AAAC2334567',
                Finish: '2021-11-12T14:39:53.224Z',
                HelpID: '618458b3e2eda0b5546e3874',
                Location: {
                    Address:
                        'Rua Conceição Costa, Pindorama - Belo Horizonte / Minas Gerais 30865-020',
                    Lat: -19.9071651,
                    Lon: -44.0180555
                },
                Name: 'teste',
                Price: 0.03,
                Start: '2021-11-12T14:39:50.637Z',
                Status: 'read',
                User: {
                    Email: 'enzo30@octupus.me',
                    MainCategory: {
                        CategoryID: '5e8e288ae28535356c331209',
                        Label: 'Consultor de viagens'
                    },
                    Name: 'teste teste',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/02e4f8d7-74a2-4d17-a36f-2a097ca5467d.png',
                    Rating: 4.892857142857142,
                    UserName: 'enzo30',
                    Verified: 'under_analysis',
                    _id: 'enzo30'
                },
                _id: '618d28f7754a07762fb8cc11'
            }
        ],
        mutate: jest.fn(),
        pagination: { next: false }
    },
    registerPro: {
        category: {
            Description: 'Estilista',
            Equal: false,
            Interval: [0, 3],
            Label: null,
            Level: 2,
            Match: 3,
            Name: 'Estilista',
            ParentID: 'testFatherID',
            Search: 0,
            Start: 0,
            Styles: [Object],
            Type: 'default',
            _id: 'testFatherID'
        },
        specialties: [],
        subs: [],
        tags: []
    },
    search: {
        category: {
            Description: 'Desenvolvedor web',
            Label: null,
            Level: 2,
            Name: 'Desenvolvedor web',
            ParentID: 'testFather',
            Search: 1000,
            Styles: { BgColor: null, Icon: null, IconColor: null },
            Type: 'default',
            _id: 'testID'
        },
        location: {
            accuracy: 3.2249999046325684,
            address: {
                City: 'Testeland',
                Country: 'BR',
                Neighborhood: 'testeNeighborhood',
                PostCode: '99999999',
                State: 'MG',
                Street: 'Rua teste'
            },
            altitude: 0,
            altitudeAccuracy: 0.5,
            displayName:
                'Rua teste, testeNeighborhood - Testeland / MG 99999999',
            heading: 0,
            latitude: -16.9661533,
            longitude: -43.22805,
            speed: 0
        },
        subCategory: null,
        distance: 50,
        maxDistance: 120,
        online: false,
        review: false
    },
    profile: {
        list: [
            {
                Address: {
                    Complement: 'Casa',
                    Number: 30,
                    Show: true,
                    City: 'Testeland',
                    Country: 'BR',
                    Neighborhood: 'testeNeighborhood',
                    PostCode: '99999999',
                    State: 'MG',
                    Street: 'Rua teste'
                },
                AddressMobile: 'Pindorama - Belo Horizonte / MG',
                BirthDate: null,
                Categories: [
                    {
                        Category: {
                            Active: true,
                            Description: 'Teste 1',
                            Label: null,
                            Level: 2,
                            Name: 'Teste 1',
                            ParentID: 'teste1',
                            Search: null,
                            Styles: [Object],
                            Type: 'default',
                            _id: 'teste1'
                        },
                        IsPrimary: true,
                        Label: 'Teste Bot'
                    },
                    {
                        Category: {
                            Active: true,
                            Description: 'Teste 2',
                            Label: null,
                            Level: 2,
                            Name: 'Teste 2',
                            ParentID: 'testFatherID',
                            Search: null,
                            Styles: [Object],
                            Type: 'default',
                            _id: 'teste2'
                        },
                        IsPrimary: false,
                        Label: 'Teste Bot'
                    }
                ],
                Category: 'Teste Bot',
                Cellphones: [],
                Contact: false,
                Distance: null,
                Email: 'enzo32@octupus.me',
                Following: false,
                Followings: 2,
                Follows: 2,
                Image: {
                    Url: 'https://canihelp.s3.us-west-1.wasabisys.com/portfolio/1641930463465-mrousavy48073332232391896045677.jpg',
                    _id: '61dddee2a60a6add9012de05'
                },
                LocationFixed: { Lat: -29.5539749, Lon: -2.655794 },
                LocationMobile: { Lat: -26.5539749, Lon: -18.655794 },
                MainCategory: {
                    CategoryID: 'testID',
                    Label: 'Desenvolvedor web',
                    IsPrimary: true
                },
                MatchedHelps: 0,
                Message: 'Testo coisas',
                Name: 'teste tab',
                Online: false,
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                Portfolio: [
                    {
                        Url: 'https:image1.jpg',
                        _id: 'image1'
                    },
                    {
                        Url: 'https:image2.jpg',
                        _id: 'image2'
                    },
                    {
                        Url: 'https:image3.jpg',
                        _id: 'image3'
                    }
                ],
                Rating: '5.00',
                Services: [
                    { Name: 'teste 10', Price: 100 },
                    { Name: 'teste 20', Price: 200 }
                ],
                UserName: 'testeoctupus',
                Views: 123,
                _id: 'testeoctupus'
            }
        ],
        mutate: jest.fn(),
        pagination: 0
    },
    user: {
        Address: {
            Complement: 'Casa',
            Number: 30,
            Show: true,
            _id: 'teste',
            City: 'Testeland',
            Country: 'BR',
            Neighborhood: 'testeNeighborhood',
            PostCode: '99999999',
            State: 'MG',
            Street: 'Rua teste'
        },
        AddressMobile: 'Pindorama - Belo Horizonte / MG',
        BirthDate: null,
        Categories: [
            {
                Category: {
                    Active: true,
                    Description: 'Teste 1',
                    Label: null,
                    Level: 2,
                    Name: 'Teste 1',
                    ParentID: 'teste1',
                    Search: null,
                    Styles: [Object],
                    Type: 'default',
                    _id: 'teste1'
                },
                IsPrimary: true,
                Label: 'Teste Bot Primary'
            },
            {
                Category: {
                    Active: true,
                    Description: 'troca pneu',
                    Level: null,
                    Name: 'troca pneu',
                    Relations: ['teste1'],
                    Search: 11,
                    Styles: [Object],
                    Type: 'specialty',
                    _id: 'teste2'
                },
                IsPrimary: false,
                Label: null
            }
        ],
        Cellphones: [],
        Contact: false,
        Distance: null,
        Email: 'testeOctopus@octupus.me',
        Following: false,
        Followings: 1,
        Follows: 2,
        Image: {
            Url: 'https://canihelp.s3.us-west-1.wasabisys.com/portfolio/11aaaa9365-mrousavy4807333291896045677.jpg',
            _id: '61dddee2a60a6add9012de05'
        },
        LocationFixed: { Lat: -53.55749, Lon: -86.6594 },
        LocationMobile: { Lat: -49.9717, Lon: -64.018498 },
        MainCategory: {
            CategoryID: '5e8e288ae28535356c33125f',
            IsPrimary: true,
            Label: 'Teste Bot'
        },
        MatchedHelps: 0,
        Message: 'Testo coisas',
        Name: 'teste tab',
        Online: false,
        Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/164193042822321786-undefined',
        Portfolio: [],
        PushToken: {
            Token: 'testToken',
            User: 'testeoctupus'
        },
        Rating: { Amount: 1, Average: 5 },
        Services: [
            { Name: 'teste 10', Price: 100 },
            { Name: 'teste 20', Price: 200 }
        ],
        Token: 'testToken',
        UserName: 'enzo32',
        Verified: 'under_analysis',
        Views: 123,
        _id: 'testeoctupus'
    },
    location: {
        coords: {
            displayName: 'Pindorama - Belo Horizonte / MG',
            latitude: -29.5539749,
            longitude: -2.655794
        },
        from: 'fixed',
        loading: false,
        notFound: false
    },
    unreadNotifications: { list: [1], mutate: jest.fn(), pagination: {} },
    stories: {
        list: [
            {
                Address: null,
                CheckIn: null,
                Comments: 0,
                CreatedAt: ' 2020-11-11T07:18:10.961Z',
                Distance: 778.6800313642741,
                Help: null,
                Images: [[Object]],
                Liked: false,
                Likes: 1,
                Location: { Lat: -19.9278645, Lon: -43.9444053 },
                Markeds: [],
                Read: false,
                Readers: [],
                SmallImage: null,
                Text: 'oi!',
                UpdatedAt: '2021-01-18T00:48:52.853Z',
                User: {
                    Email: 'teste@gmail.com',
                    MainCategory: [Object],
                    Name: 'Teste 1',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1.jpeg',
                    Rating: 4.166666666666667,
                    UserName: 'teste1',
                    Verified: 'verified',
                    _id: 'teste1'
                },
                Videos: [],
                _id: 'teste1'
            },
            {
                Address: null,
                CheckIn: null,
                Comments: 0,
                CreatedAt: '2020-12-16T18:39:32.975Z',
                Distance: 389.105513374361,
                Help: null,
                Images: [[Object]],
                Liked: false,
                Likes: 2,
                Location: { Lat: -19.9238665, Lon: -43.9446847 },
                Markeds: [],
                Read: false,
                Readers: [],
                SmallImage: null,
                Text: 'Imagem',
                UpdatedAt: '2021-01-18T00:48:41.356Z',
                User: {
                    Email: 'test2@gmail.com',
                    MainCategory: [Object],
                    Name: 'Teste 2',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/2.jpg',
                    Rating: 4.833333333333333,
                    UserName: 'teste2',
                    Verified: 'verified',
                    _id: 'teste2'
                },
                Videos: [],
                _id: 'teste2'
            }
        ]
    }
};

//Api
const MOCK_API = {
    archivedConversation: [
        {
            Archived: [
                {
                    Date: '2021-11-01T14:11:51.176Z',
                    Last: true,
                    UserID: 'enzoaazevedo'
                }
            ],
            CreatedAt: '2021-08-26T23:22:01.000Z',
            Deleted: [],
            LastMessage: {
                ConversationID: null,
                CreatedAt: null,
                Extension: null,
                Help: null,
                Message: null,
                Mime: null,
                Reference: null,
                Sender: null,
                SmallImage: null,
                Status: null,
                Type: null,
                UpdatedAt: null,
                Url: null,
                _id: null
            },
            Participants: [
                {
                    Email: 'testeOctopus@gmail.com',
                    MainCategory: [Object],
                    Name: 'testeOctopus',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1640117156229-03f0442d-d6ce-4d8b-8b9a-88999f40a493.jpg',
                    Rating: 5,
                    UserName: 'enzoaazevedo',
                    Verified: 'under_analysis',
                    _id: 'testeOctopus'
                },
                {
                    Email: 'camomila@camomila.me',
                    MainCategory: [Object],
                    Name: 'Renata Camomila ',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
                    Rating: null,
                    UserName: 'camomila',
                    Verified: 'not_verified',
                    _id: 'camomila'
                }
            ],
            Unread: 0,
            UpdatedAt: '2021-08-26T23:22:01.000Z',
            _id: '1'
        },
        {
            Archived: [
                {
                    Date: '2021-11-01T14:11:51.176Z',
                    Last: true,
                    UserID: 'enzoaazevedo'
                }
            ],
            CreatedAt: '2021-08-26T23:22:01.000Z',
            Deleted: [],
            LastMessage: {
                ConversationID: null,
                CreatedAt: null,
                Extension: null,
                Help: null,
                Message: null,
                Mime: null,
                Reference: null,
                Sender: null,
                SmallImage: null,
                Status: null,
                Type: null,
                UpdatedAt: null,
                Url: null,
                _id: null
            },
            Participants: [
                {
                    Email: 'testeOctopus@gmail.com',
                    MainCategory: [Object],
                    Name: 'testeOctopus',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1640117156229-03f0442d-d6ce-4d8b-8b9a-88999f40a493.jpg',
                    Rating: 5,
                    UserName: 'enzoaazevedo',
                    Verified: 'under_analysis',
                    _id: 'testeOctopus'
                },
                {
                    Email: 'camomila@camomila.me',
                    MainCategory: [Object],
                    Name: 'Renata Camomila ',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
                    Rating: null,
                    UserName: 'camomila',
                    Verified: 'not_verified',
                    _id: 'camomila'
                }
            ],
            Unread: 0,
            UpdatedAt: '2021-08-26T23:22:01.000Z',
            _id: '2'
        }
    ],
    comments: {
        list: [
            {
                CreatedAt: '2022-01-16T18:31:59.143Z',
                Markeds: [],
                PostID: ['ObjectId'],
                Text: 'se pelo chat',
                UpdatedAt: '2022-01-16T18:31:59.143Z',
                User: {
                    Email: 'testador@benedito.com',
                    MainCategory: {
                        CategoryID: '5e8e288ae28535356c3311d9',
                        IsPrimary: true,
                        Label: 'testador'
                    },
                    Name: 'Teste 1',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1642358112244-IMG_6628.JPG',
                    Rating: null,
                    UserName: 'teste1',
                    Verified: 'not_verified',
                    _id: 'teste1'
                },
                _id: ['ObjectId']
            },
            {
                CreatedAt: ' 2022-01-16T18:13:17.806Z',
                Markeds: [],
                PostID: ['ObjectId'],
                Text: 'vou te passar',
                UpdatedAt: ' 2022-01-16T18:13:17.806Z',
                User: {
                    Email: 'tester@benedito.com',
                    MainCategory: {
                        CategoryID: '5e8e288ae28535356c3311d9',
                        IsPrimary: true,
                        Label: 'tester'
                    },
                    Name: 'Teste 2',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1642358112244-IMG_6628.JPG',
                    Rating: null,
                    UserName: 'teste2',
                    Verified: 'not_verified',
                    _id: 'teste2'
                },
                _id: ['ObjectId']
            }
        ],
        pagination: undefined
    },
    categoriesTranportation: [
        {
            Description: 'Bike-boy',
            Label: null,
            Level: 2,
            Name: 'Bike-boy',
            ParentID: '60be3de5d0093938387cbbe7',
            Search: 0,
            Styles: {
                BgColor: '#E9F3F9',
                Icon: 'https://canihelp.s3.us-west-1.wasabisys.com/categories/7df07811-f165-4aba-8868-e2e6dc1185bc.svg',
                IconColor: '#7692fe'
            },
            Type: 'default',
            _id: '5e8e288ae28535356c331283'
        },
        {
            Description: 'Carreto',
            Label: null,
            Level: 1,
            Name: 'Carreto',
            ParentID: '6162c78a022a3f4ddd7d53f0',
            Search: null,
            Styles: {
                BgColor: '#faf3f2',
                Icon: 'https://canihelp.s3.us-west-1.wasabisys.com/categories/39a4b129-8e58-4c56-99d1-cdb31b003f95.svg',
                IconColor: '#ff7c6b'
            },
            Type: 'default',
            _id: '61b27ff500e420d7e79021d1'
        }
    ],
    categoriesPrimary: [
        {
            Childs: [[Object], [Object], [Object], [Object]],
            Description: 'Aluguel',
            Label: null,
            Name: 'Aluguel',
            Styles: {
                BgColor: '#faf3f2',
                Icon: 'https://canihelp.s3.us-west-1.wasabisys.com/categories/352dd736-94b7-49c7-9b8e-0b15ee487a88.svg',
                IconColor: '#ff6f5c'
            },
            _id: '5fb2e81c1611a56a45739d35'
        },
        {
            Childs: [[Object], [Object], [Object], [Object], [Object]],
            Description: 'Assessoria & Consultoria',
            Label: null,
            Name: 'Assessoria & Consultoria',
            Styles: {
                BgColor: '#e9f3f9',
                Icon: 'https://canihelp.s3.us-west-1.wasabisys.com/categories/7e41c29a-9b8c-46f3-81f6-0b5555693570.svg',
                IconColor: '#5d7cff'
            },
            _id: '5fb2e54e1611a56a45739c61'
        }
    ],
    conversation: {
        Archived: [],
        CreatedAt: '2021-11-28T19:38:53.482Z',
        Deleted: [],
        LastMessage: {},
        Participants: [
            {
                Email: 'empresa09@empresa.com',
                MainCategory: [Object],
                Name: 'Empresa 09',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1639346934468-depositphotos_27247873-stock-illustration-tecnology-background.jpg',
                Rating: null,
                UserName: 'empresa09',
                Verified: 'not_verified',
                _id: 'empresa09'
            },
            {
                Email: 'enzoaazevedo@gmail.com',
                MainCategory: [Object],
                Name: 'Enzo Teste final 4',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1640117156229-03f0442d-d6ce-4d8b-8b9a-88999f40a493.jpg',
                Rating: 5,
                UserName: 'enzoaazevedo',
                Verified: 'under_analysis',
                _id: 'enzoaazevedo'
            }
        ],
        Unread: 0,
        UpdatedAt: '2021-11-28T19:38:56.908Z',
        _id: '61a3dacdc421637d2eb161fc'
    },
    blockeds: [
        {
            Email: 'testeDummie@octupus.me',
            MainCategory: {
                CategoryID: [Object],
                Label: 'Chaveiro'
            },
            Name: 'Enzo Azevedo',
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/80f7a555-737a-4837-958c-708f6a835eae.jpeg',
            Rating: 1,
            UserName: 'teste1',
            Verified: 'verified',
            _id: 'teste1'
        },
        {
            Email: 'testeDummie@gmail.me',
            MainCategory: {
                CategoryID: [Object],
                Label: 'Chaveiro'
            },
            Name: 'Enzo Azevedo',
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/80f7a555-737a-4837-958c-708f6a835eae.jpeg',
            Rating: 2,
            UserName: 'teste2',
            Verified: 'not_verified',
            _id: 'teste2'
        }
    ],
    conversations: [
        {
            Archived: [[Object], [Object]],
            CreatedAt: '2021-10-11T19:12:23.212Z',
            Deleted: [[Object], [Object]],
            LastMessage: {
                ConversationID: 'testeconversation1',
                CreatedAt: '2022-01-17T18:05:28.098Z',
                Extension: null,
                Help: null,
                Message: 'Audio',
                Mime: null,
                Reference: null,
                Sender: 'enzoaazevedo',
                SmallImage: null,
                Status: 'sent',
                Type: 'audio',
                UpdatedAt: ' 2022-01-17T18:05:28.098Z',
                Url: 'https://canihelp.s3.us-west-1.wasabisys.com/chat/4540-1642442723826.mp4',
                _id: 'testeconversation1',
                metadata: [Object]
            },
            Participants: [
                { _id: 'testeoctupus' },
                {
                    Email: 'testeDummie@gmail.me',
                    MainCategory: {
                        CategoryID: [Object],
                        Label: 'Lojista'
                    },
                    Name: 'Enzo Azevedo',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/8f6a835eae.jpeg',
                    Rating: 2,
                    UserName: 'Teste 1',
                    Verified: 'not_verified',
                    _id: 'teste1'
                }
            ],
            Unread: 1,
            UpdatedAt: ' 2022-01-17T18:05:28.111Z',
            _id: 'conversation1TestId'
        },
        {
            Archived: [],
            CreatedAt: ' 2022-01-16T17:28:57.662Z',
            Deleted: [],
            LastMessage: {
                ConversationID: 'testeconversation2',
                CreatedAt: ' 2022-01-16T17:32:23.882Z',
                Extension: null,
                Help: ['ObjectId'],
                Message: 'Proposta individual',
                Mime: null,
                Reference: null,
                Sender: 'fernando',
                SmallImage: null,
                Status: 'read',
                Type: 'proposal',
                UpdatedAt: '2022-01-16T17:32:23.882Z',
                Url: null,
                _id: 'testeconversation2'
            },
            Participants: [
                { _id: 'testeoctupus' },
                {
                    Email: 'testeDummie2@gmail.me',
                    MainCategory: {
                        CategoryID: [Object],
                        Label: 'Chaveiro'
                    },
                    Name: 'Teste 2',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/808f6a835eae.jpeg',
                    Rating: 2,
                    UserName: 'teste2',
                    Verified: 'not_verified',
                    _id: 'teste2'
                }
            ],
            Unread: 0,
            UpdatedAt: '2022-01-16T17:32:23.882Z',
            _id: 'conversation2TestId'
        }
    ],
    contacts: [
        {
            Email: 'testeDummie@octupus.me',
            MainCategory: {
                CategoryID: [Object],
                Label: 'Chaveiro'
            },
            Name: 'Enzo Azevedo',
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/80f7a555-737a-4837-958c-708f6a835eae.jpeg',
            Rating: 1,
            UserName: 'teste1',
            Verified: 'verified',
            _id: 'teste1'
        },
        {
            Email: 'testeDummie@gmail.me',
            MainCategory: {
                CategoryID: [Object],
                Label: 'Chaveiro'
            },
            Name: 'Enzo Azevedo',
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/80f7a555-737a-4837-958c-708f6a835eae.jpeg',
            Rating: 2,
            UserName: 'teste2',
            Verified: 'not_verified',
            _id: 'teste2'
        }
    ],
    usersSearch: [
        {
            Address: {
                Complement: 'Casa',
                Number: 30,
                Show: true,
                _id: 'teste',
                City: 'Testeland',
                Country: 'BR',
                Neighborhood: 'testeNeighborhood',
                PostCode: '99999999',
                State: 'MG',
                Street: 'Rua teste'
            },
            AddressMobile: 'Rua teste, testeNeighborhood',
            BirthDate: null,
            Categories: [
                {
                    Category: 'teste1',
                    IsPrimary: true,
                    Label: null
                },
                {
                    Category: 'teste2',
                    IsPrimary: false,
                    Label: null
                }
            ],
            Cellphones: [],
            Contact: false,
            Distance: 1.4171564214286152,
            Email: 'festivaldetalentos123@gmail.com',
            Following: false,
            Followings: 2,
            Follows: 1,
            Image: {
                Url: 'https://canihelp.s3.us-west-1.wasabisys.com/portfolio/5c9ae837-a95b-4377-a6eb-c452b253ec50.jpeg'
            },
            LocationFixed: { Lat: -28.5117261, Lon: -96.6512292 },
            LocationMobile: { Lat: -15.9652709, Lon: -46.1893944 },
            MainCategory: {
                CategoryID: 'testID',
                Label: 'Desenvolvedor web'
            },
            MatchedHelps: 8,
            Message: 'Olá, sou um usuário Canihelp',
            Name: 'Nome Test',
            Online: false,
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
            Portfolio: [[Object]],
            Rating: { Amount: 5, Average: 4.333333333333334 },
            Services: [],
            UserName: 'tester',
            Views: 187,
            _id: 'tester'
        }
    ],
    post: [
        {
            Address:
                'Beco AA, Vila Barragem Santa Lucia - Belo Horizonte / MG 30335080',
            CheckIn: false,
            Comments: 4,
            CreatedAt: '2022-01-17T14:11:55.617Z',
            Distance: 18,
            Help: {
                Category: {
                    Description: 'Abertura de porta',
                    Label: null,
                    Name: 'Abertura de porta',
                    _id: '5e8e288ae28535356c331317'
                },
                CategoryID: {
                    Active: true,
                    Description: 'Abertura de porta',
                    Group: 'general',
                    Level: 3,
                    Name: 'Abertura de porta',
                    ParentID: '5e8e288ae28535356c3311cb',
                    Search: 2,
                    Type: 'default',
                    _id: '5e8e288ae28535356c331317'
                },
                Urgency: 'urgent'
            },
            Images: [],
            Liked: false,
            Likes: 3,
            Location: { Lat: -19.9528341, Lon: -43.9439125 },
            Markeds: [],
            Read: false,
            Readers: [],
            SmallImage: null,
            Text: 'teste',
            UpdatedAt: ' 2022-01-17T14:11:55.617Z',
            User: {
                Email: 'enzo32@octupus.me',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste Bot'
                },
                Name: 'Teste Post 1',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                Rating: 5,
                UserName: 'enzo32',
                Verified: 'under_analysis',
                _id: 'enzo32'
            },
            Videos: [],
            _id: '61e5792b63093e54f33eadd5'
        },
        {
            Address:
                'Beco AA, Vila Barragem Santa Lucia - Belo Horizonte / MG 30335080',
            CheckIn: false,
            Comments: 2,
            CreatedAt: new Date(),
            Distance: 10,
            Help: null,
            Images: [],
            Liked: false,
            Likes: 1,
            Location: { Lat: -23.5539749, Lon: -46.655794 },
            Markeds: [],
            Read: false,
            Readers: [],
            SmallImage: null,
            Text: 'tested toast',
            UpdatedAt: new Date(),
            User: {
                Email: 'enzo32@octupus.me',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste Bot6'
                },
                Name: 'Teste post 2',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                Rating: 4,
                UserName: 'enzo32',
                Verified: 'under_analysis',
                _id: 'enzo32'
            },
            Videos: [],
            _id: '61defac1b927aa8208251024'
        }
    ],
    ratingsLast: [
        {
            client: [],
            pro: [
                {
                    Agility: 5,
                    Cordiality: 5,
                    CreatedAt: '2021-12-02T13:37:46.485Z',
                    Description: 'teste desc',
                    Evaluated: {
                        Email: 'enzo32@octupus.me',
                        MainCategory: [Object],
                        Name: 'teste tab',
                        Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                        Rating: 5,
                        UserName: 'enzo32',
                        Verified: 'under_analysis',
                        _id: 'enzo32'
                    },
                    Evaluator: {
                        Email: 'enzoaazevedo@gmail.com',
                        MainCategory: [Object],
                        Name: 'Teste final 4',
                        Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641926059034-undefined',
                        Rating: 5,
                        UserName: 'enzoaazevedo',
                        Verified: 'under_analysis',
                        _id: 'enzoaazevedo'
                    },
                    Price: 5,
                    Professionalism: 5,
                    Punctuality: 5,
                    Quality: 5,
                    Title: null,
                    Total: 5,
                    _id: '61a8cc2a11663568bf7cd2e6',
                    isProReview: true
                }
            ]
        }
    ],

    helps: [
        {
            Category: {
                Description: 'Microondas 1',
                Label: null,
                Name: 'Microondas 1',
                _id: '5e8e288ae28535356c3313a3'
            },
            CreatedAt: '2021-12-17T21:23:10.516Z',
            Creator: {
                Email: 'enzoaazevedo@gmail.com',
                MainCategory: {
                    CategoryID: 'testeID',
                    IsPrimary: true,
                    Label: 'Dev'
                },
                Name: 'Enzo Teste final 1',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641926059034-undefined',
                Rating: 5,
                UserName: 'enzoaazevedo',
                Verified: 'under_analysis',
                _id: 'testeoctupus'
            },
            Description: '522',
            DisplayLocation:
                'Rua Conceição Costa, Pindorama - Belo Horizonte / MG 30865020',
            Group: 'general',
            Label: null,
            Location: { Lat: -19.90705, Lon: -44.017981 },
            MyProposal: null,
            Proposal: null,
            ProposalSelected: null,
            Provider: null,
            ProviderStatus: 'proposal_sent',
            Readers: ['enzo5'],
            Recents: null,
            ShortLocation: 'Rua 1',
            Transport: null,
            Type: 'default',
            UnreadProposals: null,
            UpdatedAt: '2021-12-17T21:23:10.516Z',
            Urgency: 'urgent',
            _id: 'help1'
        },
        {
            Category: {
                Description: 'Microondas 3',
                Label: null,
                Name: 'Chaveiro',
                _id: '5e8e288ae28535356c3311cb'
            },
            CreatedAt: '2022-01-26T15:44:31.203Z',
            Creator: {
                Email: 'enzo4@octupus.me',
                MainCategory: {
                    CategoryID: ['ObjectId'],
                    IsPrimary: true,
                    Label: 'Microondas'
                },
                Name: 'teste 3',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
                Rating: 5,
                UserName: 'teste 3',
                Verified: 'under_analysis',
                _id: 'teste4'
            },
            Description: null,
            DisplayLocation: null,
            Group: null,
            Label: null,
            Location: null,
            MyProposal: null,
            Proposal: {
                Description: 'aaaaaaaaaaaaa',
                Finish: '2022-02-26T15:54:22.073Z',
                FinishHour: '2022-02-26T23:59:59.999Z',
                Location: {
                    Address: 'Rua Casa do Ator, Vila Olímpia - São Paulo / SP',
                    Lat: -23.5983417,
                    Lon: -46.6801419
                },
                Name: 'Teste 4',
                Price: 1,
                Start: '2022-01-26T23:59:58.998Z',
                StartHour: '2022-01-26T23:59:58.998Z',
                Status: 'sent',
                User: {
                    Email: 'enzo6@octupus.me',
                    MainCategory: [Object],
                    Name: 'Teste 4',
                    Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1638294466470-db949f45-cc5a-4339-8222-ad39905e929f.jpg',
                    Rating: null,
                    UserName: 'teste4',
                    Verified: 'not_verified',
                    _id: 'testeoctupus'
                }
            },
            ProposalSelected: null,
            Provider: null,
            ProviderStatus: 'under_analysis',
            Readers: ['enzo5', 'enzo6'],
            Recents: null,
            ShortLocation: null,
            Transport: null,
            Type: 'proposal',
            UnreadProposals: null,
            UpdatedAt: ' 2022-01-26T15:44:31.203Z',
            Urgency: 'medium',
            _id: 'teste 3'
        },
        {
            Category: {
                Description: 'Motoboy',
                Label: null,
                Name: 'Motoboy',
                _id: '5e8e288ae28535356c331285'
            },
            CreatedAt: '2022-01-25T17:33:45.251Z',
            Creator: {
                Email: 'enzo32@octupus.me',
                MainCategory: {
                    CategoryID: ['ObjectId'],
                    IsPrimary: true,
                    Label: 'Teste Bot'
                },
                Name: 'teste tab',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428786-undefined',
                Rating: 5,
                UserName: 'enzo32',
                Verified: 'under_analysis',
                _id: 'enzo32'
            },
            Description: '36262',
            DisplayLocation: null,
            Group: 'transportation',
            Label: null,
            Location: null,
            MyProposal: null,
            Proposal: null,
            ProposalSelected: null,
            Provider: null,
            ProviderStatus: 'sent',
            Readers: ['enzoo3syqh'],
            Recents: [
                {
                    MainCategory: null,
                    Name: null,
                    Photo: null,
                    UserName: null,
                    _id: null
                },
                {
                    MainCategory: null,
                    Name: null,
                    Photo: null,
                    UserName: null,
                    _id: null
                }
            ],
            ShortLocation: null,
            Transport: {
                Destiny: {
                    Address:
                        'Rua Peixoto Gomide, Jardim Paulista - São Paulo / SP 01409001',
                    Lat: -23.5539749,
                    Lon: -46.655794,
                    Reference: '555'
                },
                Origin: {
                    Address:
                        'Rua Conceição Costa, Pindorama - Belo Horizonte / MG 30865020',
                    Lat: -19.9073507,
                    Lon: -44.0183322,
                    Reference: '21515'
                }
            },
            Type: 'default',
            UnreadProposals: 0,
            UpdatedAt: ' 2022-01-25T17:33:45.251Z',
            Urgency: 'can_wait',
            _id: '61f034797dea7c74d49ec2ea'
        }
    ],

    ratings: [
        {
            CreatedAt: '2021-12-02T13:38:46.149Z',
            Description: '2',
            Evaluated: {
                Email: 'teste2@octupus.me',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste Bot2'
                },
                Name: 'teste tab',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428222786-undefined',
                Rating: 5,
                UserName: 'teste32',
                Verified: 'under_analysis',
                _id: 'teste32'
            },
            Evaluator: {
                Email: 'teste1@octupus.me',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste Bot1'
                },
                Name: 'teste 1',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1',
                Rating: 5,
                UserName: 'teste1',
                Verified: 'under_analysis',
                _id: 'teste1'
            },
            Title: null,
            Total: 5,
            _id: '61a8cc66e5e65660fa45c72e',
            isProReview: false
        },
        {
            Agility: 5,
            Cordiality: 5,
            CreatedAt: '2021-12-02T13:37:46.485Z',
            Description: '222',
            Evaluated: {
                Email: 'teste2@octupus.me',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste Bot2'
                },
                Name: 'teste tab',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641930428222786-undefined',
                Rating: 5,
                UserName: 'teste32',
                Verified: 'under_analysis',
                _id: 'teste32'
            },
            Evaluator: {
                Email: 'teste2@gmail.com',
                MainCategory: {
                    CategoryID: '5e8e288ae28535356c33125f',
                    IsPrimary: true,
                    Label: 'Teste 2'
                },
                Name: 'Tester 2',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/2',
                Rating: 5,
                UserName: 'teste 22',
                Verified: 'under_analysis',
                _id: 'teste2'
            },
            Price: 5,
            Professionalism: 5,
            Punctuality: 5,
            Quality: 5,
            Title: null,
            Total: 4,
            _id: '61a8cc2a11663568bf7cd2e6',
            isProReview: true
        }
    ],
    nearProviders: [
        {
            _id: 'testezero',
            Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/shared/user-default.png',
            Image: null,
            Distance: 8.445518827951528,
            Name: 'Teste Zero',

            MainCategory: {
                CategoryID: ['ObjectId'],
                Label: 'Desenvolvedor web'
            }
        }
    ],
    notifications: [
        {
            CreatedAt: '2022-01-20T13:32:37.972Z',
            HelpID: 'mock',
            Other: {
                MainCategory: [Object],
                Name: 'Enzo Teste final 4',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641926059034-undefined',
                UserName: 'enzoaazevedo',
                _id: 'enzoaazevedo'
            },
            Post: null,
            ProposalID: null,
            RatingID: null,
            Text: 'visualizou seu perfil',
            Type: 'saw_profile',
            Url: null,
            User: 'enzo32',
            Viewed: true,
            _id: '61e9647523124ae3aa6e0574'
        },
        {
            CreatedAt: ' 2022-01-19T15:57:53.314Z',
            HelpID: null,
            Other: {
                MainCategory: [Object],
                Name: 'Enzo Teste final 4',
                Photo: 'https://canihelp.s3.us-west-1.wasabisys.com/users/1641926059034-undefined',
                UserName: 'enzoaazevedo',
                _id: 'enzoaazevedo'
            },
            Post: null,
            ProposalID: null,
            RatingID: null,
            Text: 'Deixe sua avaliação para o cliente.',
            Type: 'rating_client',
            Url: null,
            User: 'enzo32',
            Viewed: true,
            _id: '61e8350175c6f2bea51b8c43'
        }
    ]
};

export { MOCK_CONTEXT, MOCK_API };
