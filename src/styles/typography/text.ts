import { TextPropsAndroid, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');

const DEFAULT_SIZE = width > 320 ? 16 : 14;

interface TextProps extends TextPropsAndroid {
    weight?: string;
    color?: string;
    marg?: string;
    align?: string;
    size?: number;
    vertical?: string;
    pad?: string;
    line?: number;
    flex?: string | number;
    family?: string;
    decoration?: string;
    fontStyle?: string;
    wordSpace?: string;
    width?: string;
}

const Text = styled.Text<TextProps>`
    font-family: ${({ family }) => (family ? family : 'Circularstd-Book')};
    font-size: ${({ size }) => (size ? size : DEFAULT_SIZE)}px;
    color: ${({ color }) => (color ? color : '#4E4E4E')};
    font-weight: ${({ weight }) => (weight ? weight : 'normal')};
    margin: ${({ marg }) => (marg ? marg : '0')};
    padding: ${({ pad }) => (pad ? pad : '0')};
    text-align: ${({ align }) => (align ? align : 'left')};
    line-height: ${({ line }) => (line ? line : 27)}px;
    text-decoration: ${({ decoration }) => (decoration ? decoration : 'none')};
    ${({ vertical }) => `text-align-vertical: ${vertical}`};
    ${({ flex }) => flex && `flex: ${flex}`};
    ${({ fontStyle }) => fontStyle && `font-style: ${fontStyle}`};
    ${({ wordSpace }) => wordSpace && `letter-spacing: ${wordSpace}`};
    ${({ width }) => width && `width: ${width}`};
`;

export default Text;
