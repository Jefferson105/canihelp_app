import styled from 'styled-components/native';

interface DescriptionProps {
    marg?: string;
    color?: string;
    weight?: string;
    family?: string;
    size?: string;
}

const Description = styled.Text<DescriptionProps>`
    font-family: ${({ family = 'Avenir' }) => family};
    font-size: ${({ size = '16px' }) => size};
    margin: ${({ marg = '0px' }) => marg};
    color: ${({ color = 'rgba(75, 75, 75, 1)' }) => color};
    font-weight: ${({ weight = 'normal' }) => weight};
`;

export default Description;
