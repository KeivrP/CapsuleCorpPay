import React from 'react'
import {
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
} from 'react-native'
import { useMemo } from 'react'
import { TouchableOpacity as TOSheet } from '@gorhom/bottom-sheet'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export type ButtonBrandProps = {
    gorhomSheet?: boolean;
    text?: string;
    children?: React.ReactNode;
    onPress?: (() => void) | (() => Promise<void>);
    backgroundColor?: string;
    textColor?: string;
    marginVertical?: number;
    marginHorizontal?: number;
    marginBottom?: number;
    marginTop?: number;
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    marginLeft?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    textSize?: number;
    disabled?: boolean;
    isLoading?: boolean;
    width?: number | string;
    borderColor?: string;
    style?: ViewStyle;
    loadingColor?: string
};

export const ButtonBrand = ({
    gorhomSheet = false,
    text,
    onPress,
    alignItems,
    backgroundColor = '#E9F2FF',
    textColor = '#00214E',
    marginHorizontal = 0,
    marginVertical = 0,
    marginBottom = 0,
    marginTop = 0,
    marginLeft = 0,
    paddingVertical = 3,
    paddingHorizontal = 0,
    textSize = 16,
    disabled = false,
    isLoading = false,
    width = '70%',
    borderColor,
    style = {},
    loadingColor,
    children
}: ButtonBrandProps) => {
    const { stylesButton, stylesText } = useMemo(() => {
        const stylesButton: ViewStyle = {
            backgroundColor,
            borderColor,
            borderWidth: borderColor ? 2 : 0,
            paddingVertical: wp(paddingVertical),
            paddingHorizontal: wp(paddingHorizontal),
            marginHorizontal: marginHorizontal,
            borderRadius: 16,
            alignSelf: 'center',
            marginVertical,
            alignItems,
            marginBottom,
            marginTop,
            marginLeft,
            
            width: typeof width === 'string' ? wp(parseFloat(width)) : wp(width),
        }
        const stylesText: TextStyle = {
            color: disabled ? 'gray' : textColor,
            textAlign: 'center',
            fontSize: textSize,
            lineHeight: textSize + 6,
            fontFamily: 'Poppins-Regular',
        }

        return {
            stylesButton,
            stylesText,
        }
    }, [
        backgroundColor,
        textColor,
        marginVertical,
        marginHorizontal,
        marginBottom,
        marginTop,
        paddingVertical,
        textSize,
        disabled,
        width,
        marginLeft,
        paddingHorizontal,
        borderColor,
    ])

    if (gorhomSheet) {
        return (
            <TOSheet disabled={disabled} style={[stylesButton, style]} onPress={onPress}>
                {isLoading ? (
                    <ActivityIndicator color={loadingColor} />
                ) : children ? children : (<Text style={stylesText}>{text}</Text>)
                }
            </TOSheet>
        )
    }

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[stylesButton, style]}
            onPress={onPress}
        >
            {isLoading ? (
                <ActivityIndicator />
            ) : children ? children : (<Text style={stylesText}>{text}</Text>)
            }
        </TouchableOpacity>
    )
}