import React, { useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components/native';

import { useDispatch, useSelector } from '@context/index';

import { Check, EditPic } from '@styles/icons';
import { Container, Image, Float } from '@styles/index';

import { Loading } from '@styles/elements';
import { Platform, Image as NImage } from 'react-native';
import { listenerOnlineUser } from '@context/actions/socket';

const URL_PREFIX = 'wasabisys.com';

interface FigStyleProps {
    width: number;
    height: number;
    marg: string;
}

const FigStyle = css<FigStyleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ width }) => width + 'px'};
    height: ${({ height }) => height + 'px'};
    overflow: visible;
    margin: ${({ marg }) => marg + 'px'};
`;

const FigTouch = styled.TouchableOpacity<FigStyleProps>`
    ${FigStyle};
`;

const Fig = styled.View<FigStyleProps>`
    ${FigStyle};
`;

const coords = (size) => {
    if (size === 'large') {
        return css`
            top: 5px;
            right: 0px;
            width: 18px;
            height: 18px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            border: 1.5px solid #fff;
            padding: 2px 0 0 2px;
        `;
    } else {
        return css`
            top: 0px;
            right: 0px;
            width: 9px;
            height: 9px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            border: 0.5px solid #fff;
            padding: 1.5px 0 0 1.5px;
        `;
    }
};

interface VerifiedProps {
    size?: 'small' | 'normal' | 'medium' | 'large' | 'extra-large';
}

const Verified = styled.View<VerifiedProps>`
    position: absolute;
    ${({ size }) => coords(size)}
    z-index: 2;
    align-items: center;
    justify-content: center;
    background-color: #8ce29d;
`;

interface AvatarProps {
    photo: string;
    size?:
        | 'small'
        | 'normal'
        | 'medium'
        | 'large'
        | 'extra-large'
        | 'square'
        | 'custom';
    onPress?: () => void;
    user?: string;
    enableOnline?: boolean;
    verified?: boolean;
    marg?: string;
    border?: boolean;
    isBorderGreen?: boolean;
    isEdit?: boolean;
    fromProfile?: boolean;
    isProposal?: boolean;
    testID?: string;
    shadow?: boolean;
    customDim?: number;
}

const Avatar: React.FC<AvatarProps> = ({
    photo,
    size = 'normal',
    onPress,
    user,
    enableOnline = true,
    verified = false,
    marg = '0',
    border = false,
    isBorderGreen = false,
    fromProfile = false,
    isEdit = false,
    isProposal = false,
    testID = '',
    shadow = true,
    customDim
}) => {
    const dispatch = useDispatch();
    const { onlineUsers, checkingAuth } = useSelector(({ info }) => info);

    const online = useMemo(
        () => (enableOnline ? onlineUsers?.indexOf(user) > -1 : false),
        [enableOnline, onlineUsers, user]
    );

    const dimension = useMemo(() => {
        switch (size) {
            case 'small':
                return {
                    marg,
                    width: 20,
                    height: 20,
                    radius: 20,
                    icon: 15,
                    check: 4,
                    onlineSize: 6,
                    onlineR: 0
                };
            case 'medium':
                return {
                    marg,
                    width: 64,
                    height: 64,
                    radius: 50,
                    icon: 40,
                    check: 6,
                    onlineSize: 12,
                    onlineR: 2
                };
            case 'large':
                return {
                    marg,
                    width: 80,
                    height: 80,
                    radius: 80,
                    icon: 60,
                    check: 10,
                    onlineSize: 18,
                    onlineR: 4
                };
            case 'extra-large':
                return {
                    marg,
                    width: 160,
                    height: 160,
                    radius: 160,
                    icon: 120,
                    check: 18,
                    onlineSize: 24,
                    onlineR: 18
                };
            case 'square':
                return {
                    marg,
                    width: 243,
                    height: 243,
                    radius: 1,
                    onlineSize: 0,
                    onlineR: 2
                };

            case 'custom':
                return {
                    marg,
                    width: customDim,
                    height: customDim,
                    radius: customDim
                };

            default:
                return {
                    marg,
                    width: 40,
                    height: 40,
                    radius: 40,
                    icon: 30,
                    check: 6,
                    onlineSize: 12,
                    onlineR: 2
                };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    const Figure: any = useMemo(() => {
        return onPress ? FigTouch : Fig;
    }, [onPress]);

    useEffect(() => {
        if (!checkingAuth && user) listenerOnlineUser(user);
    }, [checkingAuth, dispatch, user]);

    return (
        <Container
            color="#fff"
            radius={dimension.radius}
            border={
                border &&
                (isBorderGreen ? '2px solid #8CE29D' : '1.5px solid #E3E3E3')
            }
            style={
                !border && {
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1
                    },
                    shadowOpacity: 0,
                    shadowRadius: dimension.radius,
                    elevation: isProposal || !shadow ? 2 : 8
                }
            }
        >
            <Container radius={dimension.radius} marg={border ? '2px' : '0px'}>
                <Figure testID={testID} onPress={onPress} {...dimension}>
                    <Float pad="0px">
                        {!!verified && fromProfile && (
                            <Verified size="normal">
                                <Check
                                    height={dimension.check}
                                    width={dimension.check}
                                />
                            </Verified>
                        )}
                        {online && !border && (
                            <Float
                                bottom="-2px"
                                right={`${dimension.onlineR}px`}
                                pad="0px"
                            >
                                <Container
                                    color="#8CE29D"
                                    width={`${dimension.onlineSize}px`}
                                    height={`${dimension.onlineSize}px`}
                                    radius={dimension.onlineSize}
                                />
                            </Float>
                        )}
                        {isEdit && photo.indexOf(URL_PREFIX) === -1 && (
                            <Float top="14px">
                                <Loading overlay={false} />
                            </Float>
                        )}
                        {Platform.OS === 'ios' &&
                        isEdit &&
                        photo.indexOf(URL_PREFIX) === -1 ? (
                            <NImage
                                source={{ uri: photo }}
                                style={{
                                    ...dimension,
                                    borderRadius: dimension.radius
                                }}
                            />
                        ) : (
                            <Image
                                source={
                                    typeof photo === 'string'
                                        ? { uri: photo }
                                        : photo
                                }
                                {...dimension}
                            />
                        )}
                    </Float>
                </Figure>
                {isEdit && (
                    <Float
                        radius={80}
                        pad="28px"
                        left="0"
                        top="0"
                        align="center"
                        justify="center"
                        bg="rgba(0,0,0,.2)"
                    >
                        <EditPic width={24} height={24} />
                    </Float>
                )}
            </Container>
        </Container>
    );
};

export default Avatar;
