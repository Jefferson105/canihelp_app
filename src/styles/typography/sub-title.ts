import styled from 'styled-components/native';

interface SubTitleProps {
    align?: 'left' | 'center' | 'right';
    pad?: string;
    marg?: string;
    weight?: string;
    color?: string;
    width?: number | string;
    family?: string;
    size?: number;
}

const SubTitle = styled.Text<SubTitleProps>`
    font-family: ${({ family = 'Axiforma-SemiBold' }) => family};
    ${({ weight }) => (weight ? `font-weight: ${weight}` : null)}
    font-size: ${({ size = 16 }) => size}px;
    color: ${({ color = '#323232' }) => color};
    text-align: ${({ align = 'center' }) => align};
    padding: ${({ pad = '0' }) => pad};
    margin: ${({ marg = '0' }) => marg};
    ${({ width }) => (width ? `width: ${width}px` : null)}
`;
export default SubTitle;
