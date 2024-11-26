import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';

interface ListProps {
    position?: string;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

const getStyle = ({
    position = 'relative',
    top,
    right,
    bottom,
    left
}: ListProps) => {
    return css`
        position: ${position};
        ${top && `top: ${top}px`};
        ${right && `right: ${right}px`};
        ${bottom && `bottom: ${bottom}px`};
        ${left && `left: ${left}px`};
    `;
};

const List = styled(FlatList)<ListProps>`
    ${(props) => getStyle(props)};
`;

export default List;
