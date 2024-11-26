import React from 'react';
import styled, { css } from 'styled-components/native';

interface BorderProps {
    marg?: string;
    pad?: string;
    width?: string;
    height?: string;
    align?: string;
    bdWidth?: string;
    bdColor?: string;
    type?: 'default' | 'top' | 'bottom' | 'none';
    onPress?: () => void;
    testID?: string;
    children?: React.ReactElement | Array<React.ReactElement>;
}

const getStyle = ({
    marg,
    pad,
    width,
    height,
    align,
    bdWidth,
    bdColor,
    type
}: BorderProps) => {
    return css`
        ${type === 'default' || type === 'bottom'
            ? typeof bdWidth === 'string'
                ? bdWidth
                : `border-bottom-width:${0.5}px`
            : `border-bottom-width: 0px`};

        ${type === 'default' || type === 'top'
            ? typeof bdWidth === 'string'
                ? bdWidth
                : `border-top-width: ${0.5}px`
            : `border-top-width: ${0}px`};

        ${bdColor
            ? `border-top-color: ${bdColor};`
            : 'border-top-color: #e3e3e3'};
        ${bdColor
            ? `border-bottom-color:${bdColor}`
            : 'border-bottom-color:#e3e3e3'};
        ${marg ? `margin: ${marg};` : null}
        ${pad ? `padding: ${pad};` : null}
        ${width ? `width: ${width};` : null}
        ${height ? `height: ${height};` : null}
        ${align ? `align-items: ${align};` : null}
    `;
};

const Touch = styled.TouchableOpacity<BorderProps>`
    ${(props) => getStyle(props)};
`;

const View = styled.View<BorderProps>`
    ${(props) => getStyle(props)};
`;

const BorderVertical: React.FC<BorderProps> = ({ children, ...rest }) => {
    return rest.onPress ? (
        <Touch {...rest}>{children}</Touch>
    ) : (
        <View {...rest}>{children}</View>
    );
};

export default BorderVertical;
