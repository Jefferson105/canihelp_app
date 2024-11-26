import styled, { css } from 'styled-components/native';
import { mainColor } from '@styles/colors';

interface CircleProps {
    width?: number;
    height?: number;
    bg?: string;
    radius?: number;
    marg?: string;
}

const getStyle = ({
    width = 9,
    height = 9,
    bg = mainColor,
    radius = 9,
    marg
}: CircleProps) => {
    return css`
        width: ${width}px;
        height: ${height}px;
        background-color: ${bg};
        border-radius: ${radius}px;
        ${marg && `margin: ${marg}`};
    `;
};

const Circle = styled.View<CircleProps>`
    ${(props) => getStyle(props)};
`;

export default Circle;
