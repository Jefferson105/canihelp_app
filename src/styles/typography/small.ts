import styled from 'styled-components/native';

interface TextProps {
    family?: string;
    color?: string;
    size?: number;
    top?: number;
    marg?: string;
    weight?: string;
    line?: number;
    align?: string;
    decoration?: string;
    fontStyle?: string;
}

const Small = styled.Text<TextProps>`
    font-family: ${({ family = 'Circularstd-Book' }) => family};
    font-size: ${({ size = 13 }) => size}px;
    color: ${({ color = '#4E4E4E' }) => color};
    top: ${({ top = 0 }) => top}px;
    font-weight: ${({ weight = 'normal' }) => weight};
    margin: ${({ marg = '0' }) => marg};
    text-align: ${({ align = 'right' }) => align};
    text-decoration: ${({ decoration }) => (decoration ? decoration : 'none')};
    line-height: ${({ line }) => (line ? line : 20)}px;
    text-decoration: ${({ decoration }) => (decoration ? decoration : 'none')};
    ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle}`};
`;

export default Small;
