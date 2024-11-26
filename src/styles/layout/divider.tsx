import styled from 'styled-components/native';

interface DividerProps {
    height?: string;
    bg?: string;
    top?: number;
    bottom?: number;
    pad?: string;
    marg?: string;
}

const Divider = styled.View<DividerProps>`
    width: 100%;
    height: ${({ height = '1px' }) => height};
    background: ${({ bg = '#e5e5e5' }) => bg};
    ${({ top }) => top && `margin-top: ${top}px`};
    ${({ bottom }) => bottom && `margin-bottom: ${bottom}px`};
    ${({ pad }) => pad && `padding: ${pad}`};
    ${({ marg }) => marg && `margin: ${marg}`};
`;

export default Divider;
