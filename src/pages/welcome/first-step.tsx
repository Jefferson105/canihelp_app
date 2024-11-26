import React from 'react';

import Welcome from '@components/welcome';

import { deviceSize } from '@utils/index';

const FirstStep = () => {
    const size = deviceSize();

    return (
        <Welcome
            image={{
                height: size === 'Small' ? 100 : 131.4,
                width: size === 'Small' ? 400 : 545.86,
                marg: '0 0 82.6px 0',
                source: {
                    uri: 'https://s3.us-west-1.wasabisys.com/canihelp/app-assets/firstPage.png'
                }
            }}
            pIndex={0}
            titleFirst="Shopping de"
            titleSecond="Serviços."
            txt="Um ambiente amplo, agradável e com muitas possibilidades, onde usuários interessados em contratar e oferecer serviços profissionais se encontram."
            nav="SecondStep"
        />
    );
};

export default FirstStep;
