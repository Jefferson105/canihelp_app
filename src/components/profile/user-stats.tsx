import React from 'react';

import { useSelector } from '@context/index';

import { Container, UserStats } from '@styles/index';
import Shadow from '@styles/layout/shadow';

const Stats = () => {
    const {
        profile: {
            list: [profile]
        }
    } = useSelector(({ profile }) => ({ profile }));

    return (
        <Container pad="19px 20px 0 0 ">
            <Shadow
                disable={true}
                radius={16}
                background={'#fff'}
                shadow={{
                    color: '#00000080',
                    height: 4,
                    opacity: 0.5,
                    radius: 4.65,
                    elevation: 8
                }}
            >
                <Container
                    width={profile.Rating ? '100%' : '94%'}
                    justify="space-around"
                    dir="row"
                >
                    <UserStats
                        icon="followers"
                        data={profile.Follows}
                        text="Seguidores"
                    />
                    <UserStats
                        icon="eye"
                        data={profile.Views}
                        text="Visualizações"
                    />
                    {profile.Rating && (
                        <UserStats
                            data={profile.Rating}
                            icon="star"
                            text="Avaliação"
                        />
                    )}
                </Container>
            </Shadow>
        </Container>
    );
};

export default Stats;
