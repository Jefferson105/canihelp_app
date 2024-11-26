import React from 'react';
import { Container, Title } from '@styles/index';

interface NavMenuProps {
    children: any;
    title?: string;
    size?: number;
    unique?: boolean;
    marg?: string;
}

const navSection = ({ children, title, size, marg }: NavMenuProps) => {
    return (
        <>
            {!!title && (
                <Container marg={marg ? marg : '0 24px 16px 24px'}>
                    <Title size={size}>{title}</Title>
                </Container>
            )}
            <Container>{children}</Container>
        </>
    );
};

export default navSection;
