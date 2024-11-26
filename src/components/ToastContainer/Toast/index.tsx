import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, TouchableOpacity } from 'react-native';

import { Text } from '@styles/typography';
import { mainColor } from '@styles/colors';

import { removeToast } from '@context/actions/layout';
import { IToastMessage } from '@ts/interfaces/state';

const { width, height } = Dimensions.get('window');

interface ToastProps {
    message: IToastMessage;
    index: number;
}

const ToastColor = {
    info: {
        text: '#ffffff',
        background: mainColor
    },
    success: {
        text: '#ffffff',
        background: mainColor
    },
    error: {
        text: '#ffffff',
        background: mainColor
    }
};

const Toast: React.FC<ToastProps> = ({ message, index }) => {
    const appearFromBottomAnim = useRef(new Animated.Value(100)).current;
    const moveX = useRef(new Animated.Value(0)).current;

    const moveAnimate = () => {
        Animated.timing(moveX, {
            toValue: width - 122,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(moveX, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start(() => moveAnimate());
        });
    };

    const show = () => {
        Animated.timing(appearFromBottomAnim, {
            // toValue: 0,
            toValue: -(index * (message.description ? 85 : 78)),
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    const hide = () => {
        Animated.timing(appearFromBottomAnim, {
            toValue: height,
            duration: 900,
            useNativeDriver: true
        }).start();
    };

    const removePostWithAnimation = () => {
        hide();
        setTimeout(() => {
            removeToast(message.id);
        }, 300);
    };

    const handleAction = () => {
        message.action();
        removePostWithAnimation();
    };

    useEffect(() => {
        show();

        message.showProgress && moveAnimate();

        let timer: ReturnType<typeof setTimeout>;

        if (message.visibleTime) {
            timer = setTimeout(() => {
                removePostWithAnimation();
            }, message.visibleTime);
        }

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removeToast, message, index]);

    return (
        <Animated.View
            style={{
                transform: [{ translateY: appearFromBottomAnim }],
                marginBottom: 10,
                position: 'absolute',
                bottom: 45,
                height: 75
            }}
        >
            <View
                style={{
                    width: width - 40,
                    position: 'relative',
                    paddingVertical: 10,
                    paddingLeft: 16,
                    marginLeft: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 15,
                    backgroundColor:
                        ToastColor[message.type || 'info'].background,
                    elevation: 4
                }}
            >
                <View>
                    <Text
                        color={ToastColor[message.type || 'info'].text}
                        size={18}
                        weight="700"
                    >
                        {message.title}
                    </Text>
                    {message.showProgress ? (
                        <Animated.View
                            style={[
                                {
                                    marginTop: 10,
                                    bottom: 0,
                                    left: 0,
                                    width: 50,
                                    height: 5,
                                    backgroundColor: '#ffffff',
                                    transform: [{ translateX: moveX }]
                                }
                            ]}
                        />
                    ) : (
                        message.description && (
                            <Text
                                color={ToastColor[message.type || 'info'].text}
                                size={15}
                                line={18}
                            >
                                {message.description}
                            </Text>
                        )
                    )}
                </View>

                {message.action && message.actionLabel && (
                    <TouchableOpacity
                        onPress={handleAction}
                        style={{
                            marginLeft: 10
                        }}
                    >
                        <Text
                            color={ToastColor[message.type || 'info'].text}
                            size={18}
                            line={18}
                            weight="700"
                        >
                            {message.actionLabel}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </Animated.View>
    );
};

export default Toast;
