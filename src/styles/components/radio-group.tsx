import React, { useState } from 'react';

import { Container, Press, BorderVertical } from '@styles/index';

import { SubTitle } from '@styles/typography';

import { deviceSize } from '@utils/index';
interface RadioGroupProps {
    data: Array<{
        label: string;
        total?: string;
        onPress: () => void;
    }>;
}

const size = deviceSize();

const RadioGroup = ({ data = [] }: RadioGroupProps) => {
    const [selected, setSelected] = useState(0);

    return (
        <Container width="100%" dir="row">
            {data.map((d, i) => (
                <Press
                    testID={`press-${d.label}`}
                    pad="5px 16px 7px 5px"
                    onPress={() => {
                        setSelected(i);
                        d.onPress();
                    }}
                    key={i}
                >
                    <BorderVertical
                        testID={`radio-${d.label}`}
                        bdWidth="border-bottom-width:1px"
                        type="bottom"
                        bdColor={i === selected ? '#FF7D2C' : 'transparent'}
                    >
                        <SubTitle
                            marg="0 0 7px 0"
                            size={size === 'Small' ? 12 : 14}
                        >
                            {d.label} {d.total}
                        </SubTitle>
                    </BorderVertical>
                </Press>
            ))}
        </Container>
    );
};

export default RadioGroup;
