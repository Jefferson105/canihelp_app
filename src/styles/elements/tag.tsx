import React from 'react';

import { Container, Text, Shadow } from '@styles/index';

interface tagProps {
    text?: string;
    main?: Boolean;
    press?: () => void;
    borderColor?: string;
    size?: number;
    backGroundColor?: string;
    doc?: boolean;
    selected?: boolean;
    testID?: string;
    help?: boolean;
    mTop?: number;
    mBottom?: number;
    minWidth?: number;
    withIcon?: boolean;
    center?: boolean;
}

const Tag = ({
    text,
    main,
    press,
    borderColor,
    size = 16,
    backGroundColor = '#fff',
    doc = false,
    selected = false,
    testID = '',
    help = false,
    mTop = 0,
    mBottom = 0,
    minWidth = 0,
    withIcon = false,
    center = false
}: tagProps) => {
    return (
        <Shadow
            minWidth={minWidth}
            mTop={mTop}
            mBottom={mBottom}
            radius={15}
            background={'#f3f3f3'}
            shadow={{
                color: '#00000080',
                height: 4,
                opacity: 0.3,
                radius: 4.65,
                elevation: 2
            }}
        >
            <Container
                testID={testID}
                border={
                    main
                        ? '1.5px solid #FF6F5C'
                        : borderColor
                          ? borderColor
                          : ''
                }
                onPress={() => {
                    if (press) press();
                }}
                dir="row"
                radius={15}
                pad={help ? '0 30px' : '0 15px'}
                align="center"
                justify={center ? 'center' : 'space-between'}
                color={
                    backGroundColor !== '#fff'
                        ? backGroundColor
                        : selected
                          ? '#FF6F5C'
                          : '#fff'
                }
            >
                <Text
                    color={
                        backGroundColor === '#FF6F5C' || selected
                            ? '#fff'
                            : '#4E4E4E'
                    }
                    line={help ? size + 2 : 27}
                    size={size}
                >
                    {text}
                </Text>
                {doc && <Text size={18}>{'  '}x</Text>}
                {selected && (
                    <Text
                        wordSpace="-2px"
                        marg="0 0 0 5px"
                        weight="bold"
                        color="#fff"
                    >
                        --
                    </Text>
                )}
                {!!(withIcon && !selected) && <Text marg="0 0 0 5px">+</Text>}
            </Container>
        </Shadow>
    );
};

export default Tag;
