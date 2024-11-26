import React from 'react';

import { Container, Float } from '@styles/index';
import { Icon } from '@styles/icon';

const HelpAvatar = ({ isMe }) => {
    return (
        <Container
            width="40px"
            height="40px"
            radius={40}
            border=" 0.2px solid #4e4e4e"
        >
            <Float
                pad="0px"
                left="8px"
                bottom="7px"
                align="center"
                justify="center"
            >
                <Container
                    style={{
                        transform: [
                            {
                                rotateY: isMe ? '0deg' : '180deg'
                            },
                            { rotateZ: '0deg' }
                        ]
                    }}
                    width="24px"
                    height="24px"
                >
                    <Icon name="helpArrow" width={28} height={28} />
                </Container>
            </Float>
        </Container>
    );
};

export default HelpAvatar;
