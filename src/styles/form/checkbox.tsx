import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

import { View, TouchableWithoutFeedback, Animated } from 'react-native';

import { Icon } from '@styles/icon';

interface ContainerProps {
    mTop: number;
    width?: string;
    justify?: string;
}

const Container = styled.View<ContainerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${({ mTop }) => mTop}px;

    ${({ width }) => width && `width: ${width}`};
    ${({ justify }) => justify && `justify-content: ${justify}`};
`;

interface LabelProps {
    checkDirection?: 'right' | 'left';
}

const Label = styled.Text<LabelProps>`
    margin-left: ${({ checkDirection }) =>
        checkDirection === 'right' ? 10 : 0}px;
`;

interface CheckboxProps {
    checked?: boolean;
    label?: string;
    onChange?: () => void;
    top?: number;
    checkDirection?: 'right' | 'left';
    width?: string;
    justify?: string;
    value?: boolean;
    index?: number;
    testID?: string;
}

const Checkbox = ({
    checked,
    checkDirection = 'right',
    label,
    onChange,
    top = 0,
    width,
    justify,
    index = 0
}: CheckboxProps) => {
    const [select, setSelect] = useState(checked);
    const { COLORS } = useTheme();

    const checkboxAnimation = React.useRef(
        new Animated.Value(select ? 23 : 0)
    ).current;

    const animate = (checked) => {
        Animated.timing(checkboxAnimation, {
            toValue: checked ? 23 : 0,
            duration: 200,
            useNativeDriver: false
        }).start();
    };

    const square = {
        height: checkboxAnimation,
        width: checkboxAnimation
    };

    useEffect(() => {
        setSelect(checked);
        animate(checked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);
    return (
        <Container mTop={top} width={width} justify={justify}>
            {checkDirection === 'right' ? (
                <>
                    <TouchableWithoutFeedback
                        testID={`checkbox${index}`}
                        onPress={() => {
                            setSelect(!select);
                            onChange();
                        }}
                        accessible={true}
                        accessibilityLabel="Checkbox selection"
                    >
                        <View
                            style={{
                                position: 'relative',
                                right: 0,
                                width: 30,
                                height: 30,
                                backgroundColor: 'transparent',
                                borderRadius: 8,
                                borderColor: select
                                    ? COLORS.mainColor
                                    : '#A5A5A5',
                                borderWidth: 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Animated.View
                                style={[
                                    {
                                        backgroundColor: COLORS.mainColor,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 6,
                                        marginLeft: 0,
                                        borderRadius: 7
                                    },
                                    square
                                ]}
                            >
                                <Icon name="check" width={18} height={18} />
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Label checkDirection={checkDirection}>{label}</Label>
                </>
            ) : (
                <>
                    <Label checkDirection={checkDirection}>{label}</Label>

                    <TouchableWithoutFeedback
                        onPress={() => {
                            setSelect(!select);
                            onChange();
                        }}
                    >
                        <View
                            style={{
                                position: 'relative',
                                right: 0,
                                width: 30,
                                height: 30,
                                backgroundColor: 'transparent',
                                borderRadius: 8,
                                borderColor: select
                                    ? COLORS.mainColor
                                    : '#CCCCCC',
                                borderWidth: 2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Animated.View
                                style={[
                                    {
                                        backgroundColor: COLORS.mainColor,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingTop: 6,
                                        marginLeft: 2,
                                        borderRadius: 7
                                    },
                                    square
                                ]}
                            >
                                <Icon name="check" width={18} height={18} />
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </>
            )}
        </Container>
    );
};

export default Checkbox;
