import styled, { css } from 'styled-components/native';

interface IProps {
    pad?: string;
    marg?: string;
    bg?: string;
    border?: string;
    width?: number;
    height?: number;
    radius?: number;
    aling?: string;
    justify?: string;
    testID?: string;
}

const getStyle = ({
    pad,
    marg,
    bg,
    width,
    height,
    radius,
    border,
    aling = 'center',
    justify = 'center'
}: IProps) => {
    return css`
        ${marg && `margin: ${marg}`};
        ${pad && `padding: ${pad}`};
        ${bg && `background-color: ${bg}`};
        ${width && `width: ${width}px`};
        ${height && `height: ${height}px`};
        ${radius && `border-radius: ${radius}px`};
        ${border && `border: ${border}`};
        ${aling && `align-items: ${aling}`};
        ${justify && `justify-content: ${justify}`};
    `;
};

const Press = styled.TouchableOpacity<IProps>`
    flex-direction: row;
    ${(props) => getStyle(props)}
`;

export default Press;
