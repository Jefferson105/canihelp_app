import styled, { css } from 'styled-components/native';

interface FloatProps {
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    pad?: string;
    width?: number | string;
    height?: number | string;
    radius?: number;
    bg?: string;
    flex?: number;
    align?: string;
    justify?: string;
    minHeight?: string;
    maxHeight?: string;
    flexDir?: 'row' | 'column';
    zIndex?: number;
    borderB?: string;
}

const getStyle = ({
    top,
    left,
    bottom,
    right,
    pad = '10px 20px',
    bg,
    width,
    height,
    radius,
    align,
    justify,
    flex,
    minHeight,
    maxHeight,
    flexDir,
    zIndex,
    borderB
}: FloatProps) => {
    return css`
        ${top && `top: ${top}`};
        ${left && `left: ${left}`};
        ${bottom && `bottom: ${bottom}`};
        ${right && `right: ${right}`};
        ${bg && `background-color: ${bg}`};
        ${width && `width: ${width}`};
        ${height && `height: ${height}`};
        ${radius && `border-radius: ${radius}px`};
        ${flex && `flex: ${flex}`};
        ${flexDir && `flex-direction: ${flexDir}`};
        ${align && `align-items: ${align}`};
        ${justify && `justify-content: ${justify}`};
        ${minHeight && `min-height: ${minHeight}`};
        ${maxHeight && `max-height: ${maxHeight}`};
        ${zIndex && `z-index: ${zIndex}`};
        ${borderB && `border-bottom: ${borderB}`};
        padding: ${pad};
    `;
};

const Float = styled.View<FloatProps>`
    position: absolute;
    z-index: 1;
    ${(props) => getStyle(props)}
`;

export default Float;
