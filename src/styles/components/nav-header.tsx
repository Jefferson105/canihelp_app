import React from 'react';
import styled, { css } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { Title } from '@styles/index';
import { Icon } from '@styles/icon';

const borderStyle = css`
    border-bottom-color: rgba(0, 0, 0, 0.1);
    border-bottom-width: 1px;
`;

interface ContainerProps {
    bg?: string;
    pad?: string;
    bordered?: boolean;
    justify?: string;
}

const Container = styled.View<ContainerProps>`
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${({ justify = 'flex-start' }) => justify};
    background-color: ${({ bg }) => bg};
    ${({ bordered }) => bordered && borderStyle}
    padding: ${({ pad = '13px 20px 13px 10px' }) => pad};
`;

const Btn = styled.TouchableOpacity`
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
`;

interface RightProps {
    marginR?: string;
    marginL?: string;
}

const Right = styled.View<RightProps>`
    margin-left: ${({ marginL }) => (marginL ? marginL : 'auto')};
    margin-right: ${({ marginR }) => (marginR ? marginR : 0)};
`;

const Left = styled.View`
    padding-right: 10px;
`;

interface NavHeaderProps {
    back?: boolean;
    title?: string;
    backHandler?: () => void;
    right?: React.ReactNode;
    rightStyle?: [];
    pad?: string;
    bordered?: boolean;
    bg?: string;
    justify?: string;
    big?: boolean;
    help?: boolean;
    send?: boolean;
    paddingText?: string | boolean;
    left?: React.ReactNode;
}

const NavHeader = ({
    justify,
    back = true,
    title,
    backHandler,
    right,
    pad,
    bg = '#fff',
    bordered = false,
    big = false,
    help = false,
    paddingText = false,
    left
}: NavHeaderProps) => {
    const navigation = useNavigation();

    return (
        <Container bg={bg} pad={pad} bordered={bordered}>
            {!!back && (
                <Btn
                    testID="arrowBack"
                    onPress={() =>
                        backHandler ? backHandler() : navigation.goBack()
                    }
                    accessible={true}
                    accessibilityLabel="Back button"
                >
                    <Icon name="arrowBack" color="#323232" />
                </Btn>
            )}

            <Container
                bg={bg}
                pad={typeof paddingText === 'string' ? paddingText : '0'}
                justify={justify}
            >
                {!!left && <Left>{left}</Left>}
                {!!title && (
                    <Title
                        marg={help ? '0 0 0 auto' : '0 18% 0 0'}
                        size={big ? 24 : 16}
                        align="center"
                    >
                        {title}
                    </Title>
                )}
                {!!right && (
                    <Right marginL={help && '4px'} marginR={help && 'auto'}>
                        {right}
                    </Right>
                )}
            </Container>
        </Container>
    );
};

export default NavHeader;
