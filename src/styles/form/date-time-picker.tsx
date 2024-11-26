import React from 'react';
import { Modal } from 'react-native';
import styled, { css } from 'styled-components/native';

import Shadow from '@styles/layout/shadow';
import DatePicker from '@components/date-picker';

interface ContainerProps {
    mTop: number;
    mBottom: number;
    width: string;
    flex: number | string;
}

const cStyle = ({ mTop = 0, mBottom = 0, width = '100%', flex }) => {
    return css`
        margin-top: ${mTop}px;
        margin-bottom: ${mBottom}px;

        ${width && `width: ${width}`};
        ${flex && `flex: ${flex}`};
    `;
};

const Container = styled.TouchableOpacity<ContainerProps>`
    ${(props) => cStyle(props)};
`;

const Label = styled.Text`
    font-family: Circularstd-Book;
    font-size: 14px;
    color: #4e4e4e;
    margin-bottom: 9.12px;
    font-weight: bold;
`;

const Input = styled.TextInput`
    height: 50px;
    border-radius: 5px;
    font-family: Circularstd-Book;
    font-size: 16px;
    color: #4e4e4e;
    align-items: flex-end;
`;

interface SelectProps {
    value: {
        value: Date;
        label: string;
    };
    onChangeValue: (date: Date) => void;
    mTop?: number;
    mBottom?: number;
    width?: string;
    flex?: number;
    label?: string;
    shadow?: boolean;
    background?: string;
    borderRadius?: number;
    height?: number;
    display?: string;
}

const DateTimePicker: React.FC<SelectProps> = ({
    value,
    onChangeValue,
    mTop,
    mBottom,
    width = '100%',
    flex,
    label,
    shadow = true,
    background = '#FFF',
    borderRadius
}) => {
    const [visible, setVisible] = React.useState(false);

    const onChange = (value: Date) => {
        setVisible(false);

        if (!value) return;
        onChangeValue(value);
    };

    return (
        <Container
            mTop={mTop}
            mBottom={mBottom}
            width={width}
            flex={flex}
            activeOpacity={1}
            onPress={() => setVisible(true)}
            testID="test-date-picker"
        >
            {!!label && <Label>{label}</Label>}
            <Shadow
                radius={borderRadius ? borderRadius : 5}
                background={background}
                shadow={{
                    color: '#00000080',
                    height: 4,
                    opacity: 0.3,
                    radius: borderRadius,
                    elevation: shadow ? 8 : 0
                }}
                disable={true}
                onPress={() => setVisible(true)}
            >
                <Input
                    editable={false}
                    value={value.label}
                    style={{ paddingLeft: 15 }}
                    pointerEvents="none"
                    onFocus={() => setVisible(true)}
                />

                {visible && (
                    <Modal transparent>
                        <DatePicker
                            date={value.value || new Date()}
                            onChange={onChange}
                        />
                    </Modal>
                )}
            </Shadow>
        </Container>
    );
};

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
