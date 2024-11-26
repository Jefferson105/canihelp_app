import React from 'react';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption
} from 'react-native-popup-menu';

import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon';

interface PopUpMenuProps {
    list?: Array<{
        text: string;
        fn: () => void;
    }>;
    top?: number;
    bottom?: number;
    color?: string;
    testId?: string;
}

const PopUpMenu = ({
    list = [],
    top = 0,
    bottom = 0,
    color = '#000',
    testId
}: PopUpMenuProps) => {
    return (
        <Menu
            style={{
                paddingTop: top,
                paddingBottom: bottom
            }}
        >
            <MenuTrigger testID={testId ? testId + '-pop' : 'test-edit-modal'}>
                <Icon name="tripleDot" color={color} />
            </MenuTrigger>
            <MenuOptions testID={`MenuTrigger-${testId}`}>
                {list.map((l, i) => (
                    <MenuOption
                        key={i}
                        customStyles={{
                            optionText: {
                                color: mainColor
                            },
                            optionWrapper: {
                                paddingVertical: 20,
                                paddingHorizontal: 20
                            }
                        }}
                        onSelect={() => l.fn()}
                        text={l.text}
                    />
                ))}
            </MenuOptions>
        </Menu>
    );
};

export default PopUpMenu;
