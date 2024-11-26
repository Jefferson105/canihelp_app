import styled from 'styled-components/native';
import theme from '@styles/theme';

interface CategoryProps {
    color?: string;
    margin?: string;
    decoration?: string;
}

const Category = styled.Text<CategoryProps>`
    font-family: 'Circularstd-Book';
    font-size: 13px;
    color: ${({ color = theme.COLORS.golden }) => color};
    margin: ${({ margin = '0' }) => margin};
    text-decoration: ${({ decoration = 'none' }) => decoration};
`;

export default Category;
