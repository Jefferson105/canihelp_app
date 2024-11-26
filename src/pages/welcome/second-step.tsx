import React from 'react';

import Welcome from '@components/welcome';

import { deviceSize } from '@utils/index';

const SecondStep = () => {
    const size = deviceSize();
    return (
        <Welcome
            image={{
                height: size === 'Small' ? 109.4 : 209.4,
                width: size === 'Small' ? 118.4 : 218.4,
                marg: '0 0 43.3px 0',
                source: {
                    uri: 'https://s3.us-west-1.wasabisys.com/canihelp/app-assets/secondPage.png'
                }
            }}
            pIndex={1}
            titleFirst="Sempre por"
            titleSecond="perto e real."
            txt="Utilizamos tecnologias que permitem usuários se encontrarem sempre por perto e comunicarem em tempo real."
            nav="ThirdStep"
        />
    );
};

export default SecondStep;
