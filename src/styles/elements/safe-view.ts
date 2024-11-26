import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';

interface SafeViewProps {
    color?: string;
    pad?: string;
}

const SafeView = styled(SafeAreaView)<SafeViewProps>`
    flex: 1;
    background-color: ${({ color = '#FAFAFA' }) => color};
    padding: ${({ pad = '0px' }) => pad};
`;

export default SafeView;
