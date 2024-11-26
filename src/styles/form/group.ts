import styled from 'styled-components/native';

interface GroupProps {
    justify?: string;
    top?: number;
}

const Group = styled.View<GroupProps>`
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: row;
    justify-content: ${({ justify = 'space-between' }) => justify};
    align-items: flex-end;
    margin-top: ${({ top = 0 }) => top}px;
`;

export default Group;
