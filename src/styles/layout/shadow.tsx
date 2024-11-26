import React from 'react';
import { TouchableOpacity } from 'react-native';

interface shadowProp {
    color?: string;
    height?: number;
    opacity?: number;
    radius?: number;
    elevation?: number;
    disable?: boolean;
}

interface shadowStyle {
    children?: any;
    radius?: number;
    mRight?: number;
    mLeft?: number;
    width?: string | number;
    background?: string;
    shadow?: shadowProp;
    disable?: boolean;
    bBR?: number;
    bBL?: number;
    bTR?: number;
    bTL?: number;
    mBottom?: number;
    mTop?: number | string;
    pad?: number;
    onPress?: () => void;
    overflow?: boolean;
    minWidth?: number;
}

const Shadow = ({
    children,
    radius,
    mRight = 0,
    mLeft = 0,
    width,
    background,
    mTop = 0,
    mBottom = 0,
    shadow,
    disable = false,
    bBR,
    bBL,
    bTR,
    bTL,
    pad = 0,
    onPress = null,
    overflow = false,
    minWidth = 0
}: shadowStyle) => {
    const dynamicStyles: any = {
        width: width,
        marginTop: mTop
    };

    const styles = {
        marginBottom: mBottom,
        marginRight: mRight,
        marginLeft: mLeft,
        borderRadius: radius,
        shadowColor: shadow.color,
        shadowOffset: {
            width: 0,
            height: shadow.height
        },
        shadowOpacity: shadow.opacity,
        shadowRadius: shadow.radius,
        elevation: shadow.elevation,
        overflow: overflow ? 'hidden' : 'visible',
        minWidth: minWidth
    };

    return (
        <TouchableOpacity disabled={disable} style={[styles, dynamicStyles]}>
            <TouchableOpacity
                disabled={disable}
                style={{
                    backgroundColor: background,
                    borderRadius: radius,
                    borderBottomRightRadius: bBR,
                    borderBottomLeftRadius: bBL,
                    borderTopLeftRadius: bTR,
                    borderTopRightRadius: bTL,
                    overflow: 'hidden',
                    padding: pad
                }}
                onPress={onPress}
            >
                {children}
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default Shadow;
