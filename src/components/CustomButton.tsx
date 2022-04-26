import React from "react";
import { TouchableOpacity, View, StyleProp, StyleSheet, Text, GestureResponderEvent } from "react-native";

type CustomButtonProps = {
    style?: StyleProp<View>;
    title: string;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}
export const CustomButton = (props: CustomButtonProps) => {
    const combineStyles = (): any => {
        if (props.style) {
            return [styles.buttonWrapper, props.style];
        } else if (props.disabled) {
            return [styles.buttonWrapper, { backgroundColor: "#CCCCCC" }]
        } else {
            return styles.buttonWrapper;
        }
    }
    const onPress = (event: GestureResponderEvent) => {
        // hack to remove freezing effect from the button
        setTimeout(() => props.onPress(event), 0.1);
    }
    return (
        <TouchableOpacity activeOpacity={0.1} onPress={onPress} disabled={props.disabled}>
            <View style={combineStyles()}>
                <Text style={styles.text}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonWrapper: {
        backgroundColor: "#27bce6",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 3
    },
    text: {
        fontSize: 26,
        marginVertical: 10,
        color: "#333"
    }
});