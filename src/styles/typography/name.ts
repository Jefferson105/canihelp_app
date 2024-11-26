import styled from 'styled-components/native';

interface NameProps {
    color?: string;
    marg?: string;
    family?: string;
    size?: number;
    textAlign?: string;
}

const Name = styled.Text<NameProps>`
    font-family: ${({ family }) => (family ? family : 'Axiforma-SemiBold')};
    font-size: ${({ size }) => (size ? size : 24)}px;
    color: ${({ color = 'rgba(75, 75, 75, 1)' }) => color};
    ${({ marg }) => marg && `margin: ${marg}`};
    ${({ textAlign }) => textAlign && `text-align: ${textAlign}`};
`;

export default Name;
