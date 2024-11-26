import React from 'react';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
    justify?: string;
    align?: string;
    dir?: string;
    color?: string;
    width?: string;
    marg?: string;
    pad?: string;
    flex?: string | number;
    bottom?: string;
    onPress?: (ev?) => void;
    onLongPress?: () => void;
    onLayout?: (ev) => void;
    border?: string;
    radius?: number;
    height?: string;
    wrap?: string;
    zIndex?: number;
    overflow?: string;
    self?: string;
    minWidth?: string;
    style?: Record<string, unknown>;
    opacity?: string;
    position?: string;
    maxWidth?: string;
    bBottomL?: string;
    bBottomR?: string;
    bTopL?: string;
    bTopR?: string;
    testID?: string;
    activeOpacity?: number;
    children?: any;
    accessible?: boolean;
    accessibilityLabel?: string;
    gap?: string;
}

const getStyle = ({
    justify,
    align,
    dir,
    color,
    width,
    marg,
    pad,
    flex,
    border,
    radius,
    height,
    wrap,
    zIndex,
    overflow,
    self,
    minWidth,
    opacity,
    position,
    maxWidth,
    bBottomL,
    bBottomR,
    bTopL,
    bTopR,
    gap
}: ContainerProps) => {
    return css`
        background-color: ${color || 'transparent'};
        flex-direction: ${dir || 'column'};
        align-items: ${align || 'flex-start'};
        justify-content: ${justify || 'flex-start'};
        ${self && `align-self: ${self}`};
        ${height && `height: ${height}`};
        ${minWidth && `minWidth: ${minWidth}`};
        ${wrap && `flex-wrap: ${wrap}`};
        ${pad && `padding: ${pad}`};
        ${marg && `margin: ${marg}`};
        ${width && `width: ${width}`};
        ${flex && `flex: ${flex}`};
        ${border && `border: ${border}`};
        ${radius && `border-radius: ${radius}px`};
        ${zIndex && `z-index: ${zIndex}`};
        ${overflow && `overflow: ${overflow}`};
        ${opacity && `opacity: ${opacity}`};
        ${position && `position: ${position}`};
        ${maxWidth && `max-width: ${maxWidth}`};
        ${bBottomL && `border-bottom-left-radius: ${bBottomL}`};
        ${bBottomR && `border-bottom-right-radius: ${bBottomR}`};
        ${bTopL && `border-top-left-radius: ${bTopL}`};
        ${bTopR && `border-top-right-radius: ${bTopR}`};
        ${gap && `gap: ${gap}`};
    `;
};

const Touch = styled.TouchableOpacity<ContainerProps>`
    ${(props) => getStyle(props)};
`;

const View = styled.View<ContainerProps>`
    ${(props) => getStyle(props)};
`;

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
    return rest.onPress || rest.onLongPress ? (
        <Touch {...rest}>{children}</Touch>
    ) : (
        <View {...rest}>{children}</View>
    );
};

export default Container;
