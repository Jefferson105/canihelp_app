import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Text } from '@styles/index';

import { checkConnect } from '@utils/index';
import { useCallback } from 'react';
import { mainColor } from '@styles/colors';

const MentionText = ({
    msg,
    markeds,
    postId,
    size = 16,
    line = 27,
    maxLines = 0
}) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const [lines, setLines] = useState(1);

    const parseText = useCallback(() => {
        const text = [];

        msg.split('@').forEach((m, i) => {
            // invalid text
            if (!m) return;

            const nextSpace = m.indexOf(' ');
            const firstWord = m.slice(0, nextSpace);

            const mark = markeds.find((mk) => mk.UserName === firstWord);

            if (mark) {
                text.push(
                    <Text
                        line={line}
                        size={size}
                        key={i + postId}
                        color="#FF6F5C"
                        onPress={checkConnect.bind({}, isConnected, () => {
                            if (!mark?._id) return;
                            navigation.navigate('Profile', {
                                user: mark._id
                            });
                        })}
                    >
                        {mark.Name}
                    </Text>
                );

                const final = m.slice(nextSpace);

                if (final)
                    text.push(
                        <Text size={size} key={i}>
                            {final}
                        </Text>
                    );
            } else {
                text.push(
                    <Text size={size} key={i}>
                        {m}
                    </Text>
                );
            }
        });

        return text;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg, markeds, isConnected]);

    return (
        <>
            <Text
                onTextLayout={(e) => setLines(e.nativeEvent.lines.length)}
                numberOfLines={maxLines}
                size={size}
                ellipsizeMode="clip"
            >
                {parseText()}
            </Text>
            {maxLines > 0 && lines > maxLines && (
                <Text color={mainColor}> ...ver mais</Text>
            )}
        </>
    );
};

export default MentionText;
