import React from 'react';

import Welcome from '@components/welcome';
import { deviceSize } from '@utils/index';

const ThirdStep = () => {
    const size = deviceSize();
    return (
        <Welcome
            image={{
                height: size === 'Small' ? 133.66 : 243.66,
                width: size === 'Small' ? 111.93 : 221.93,
                marg: '0 00 38.09px 0',
                source: {
                    uri: 'https://s3.us-west-1.wasabisys.com/canihelp/app-assets/thirdPage.png'
                }
            }}
            pIndex={2}
            titleFirst="Adaptativo e"
            titleSecond="evolutivo."
            txt="As funcionalidades permitem você interagir e realizar negócios do jeito, na hora e local que você deseja. Comece a se conectar com outros usuários."
            nav="Home"
        />
    );
};

export default ThirdStep;
