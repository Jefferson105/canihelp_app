import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, ScrollView } from 'react-native';

import { Container as Line, ModalItem } from '@styles/index';
import { GenericModalProps } from '@components/generic-modal';
import { mainColor } from '@styles/colors';

const ModalAlbum = ({ isVisible, onClose, options }: GenericModalProps) => {
    const [selected, setSelected] = useState(0);

    const AnimatedHeigth = useRef(new Animated.Value(0)).current;
    //Animate dropDownHeigth
    const animate = () => {
        Animated.timing(AnimatedHeigth, {
            toValue: isVisible ? 100 : 0,
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    const handleClose = () => {
        onClose();
        animate();
    };

    //handle the dropDownHeigth
    const handleHeight = AnimatedHeigth.interpolate({
        inputRange: [0, 100],
        outputRange: [0, options.length * 62]
    });

    useEffect(() => {
        animate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisible]);

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <Line flex={1} onPress={handleClose}>
                <Animated.View style={[{ maxHeight: handleHeight }]}>
                    <Line
                        justify="center"
                        marg={'56px 0 20px 14%'}
                        align="center"
                        width="40%"
                        color="#fffbfb"
                        flex={1}
                    >
                        <ScrollView
                            style={{
                                flex: 1,
                                width: '100%',
                                paddingLeft: 20,
                                paddingRight: 20
                            }}
                        >
                            {options.map(
                                (option, index) =>
                                    option.show && (
                                        <Line
                                            key={index}
                                            width="100%"
                                            pad={`0 ${
                                                option.isLast ? '8px' : '0'
                                            }`}
                                        >
                                            <ModalItem
                                                key={index}
                                                onPress={() => {
                                                    setSelected(index);
                                                    option.onPress();
                                                }}
                                                text={option.text}
                                                color={
                                                    selected === index
                                                        ? mainColor
                                                        : option.color
                                                }
                                            />
                                        </Line>
                                    )
                            )}
                        </ScrollView>
                    </Line>
                </Animated.View>
            </Line>
        </Modal>
    );
};

export default ModalAlbum;
