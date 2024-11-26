import styled from 'styled-components/native';

interface TitleProps {
    align?: 'left' | 'center' | 'right';
    top?: number;
    bottom?: number;
    weight?: string;
    color?: string;
    width?: number | string;
    family?: string;
    size?: number;
    line?: number;
    marg?: string;
}

const Title = styled.Text<TitleProps>`
    font-family: ${({ family = 'Axiforma-SemiBold' }) => family};
    ${({ weight }) => weight && `font-weight: ${weight}`};
    font-size: ${({ size = 24 }) => size}px;
    color: ${({ color = '#323232' }) => color};
    text-align: ${({ align = 'center' }) => align};
    padding-top: ${({ top = 0 }) => top}px;
    padding-bottom: ${({ bottom = 0 }) => bottom}px;
    ${({ width }) => width && `width: ${width}px`};
    line-height: ${({ line }) => (line ? line : 27)}px;
    margin: ${({ marg = '0px' }) => marg};
`;
export default Title;
