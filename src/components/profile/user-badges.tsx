import React from 'react';

import { useSelector } from '@context/index';

import { Container, UserBadges } from '@styles/index';

const Badges = () => {
    const {
        profile: {
            list: [profile]
        }
    } = useSelector(({ profile }) => ({
        profile
    }));

    if (profile.Verified !== 'verified') return null;

    return (
        <Container pad="19px 20px 0 0 ">
            <UserBadges
                badge="verified"
                title="Perfil Verificado"
                description="Esse usuário teve seus documentos verificados, o que comprova sua identidade."
            />
            <UserBadges
                title="Usuário Recomendado"
                description="Esse usuário tem mais de 6 meses ativos na plataforma e 100% de sua avaliações positivas."
            />
        </Container>
    );
};

export default Badges;
