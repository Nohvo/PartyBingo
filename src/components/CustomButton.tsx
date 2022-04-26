import React, { useMemo } from "react";
import { TouchableOpacity, View, StyleProp, StyleSheet, Text, GestureResponderEvent, ViewStyle } from "react-native";

type CustomButtonProps = {
    style?: StyleProp<ViewStyle>;
    title: string;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}
export const CustomButton = (props: CustomButtonProps) => {
    const combineStyles = (): any => {
        if (props.style && props.disabled) {
            return [styles.buttonWrapper, props.style, { backgroundColor: "#CCC", borderColor: "#DDD" }];
        } else if (props.style) {
            return [styles.buttonWrapper, props.style];
        } else if (props.disabled) {
            return [styles.buttonWrapper, { backgroundColor: "#CCC", borderColor: "#DDD" }]
        } else {
            return styles.buttonWrapper;
        }
    }
    const onPress = (event: GestureResponderEvent) => {
        // hack to remove freezing effect from the button
        setTimeout(() => props.onPress(event), 0.1);
    }

    const memoizedStyles = useMemo(combineStyles, [props.style, props.disabled]);

    return (
        <TouchableOpacity activeOpacity={0.1} onPress={onPress} disabled={props.disabled}>
            <View style={memoizedStyles}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: "#5ea6ff",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.8,
        borderRadius: 5,
        borderColor: "#000",
    },
    text: {
        fontSize: 26,
        marginVertical: 10,
        color: "#222",
        fontFamily: "Cairo-Bold"
    }
});