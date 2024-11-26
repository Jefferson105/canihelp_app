import styled from 'styled-components/native';

import { grey } from '@styles/colors';

interface UserNameProps {
    color?: string;
    marg?: string;
    family?: string;
    size?: number;
}

const UserName = styled.Text<UserNameProps>`
    font-family: ${({ family }) => (family ? family : 'Avenir')};
    font-size: ${({ size }) => (size ? size : 14)}px;
    color: ${({ color = grey }) => color};
    margin: ${({ marg = '0' }) => marg};
`;

export default UserName;
