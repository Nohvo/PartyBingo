import React from "react";
import { TouchableOpacity, View, StyleProp, StyleSheet, Text, GestureResponderEvent } from "react-native";
import { Colors } from "../style/Colors";

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
    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled} style={{backgroundColor:Colors.BACKGROUND}}>
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
        marginBottom: 3,
        borderWidth:1,
        borderRadius:15,
    },
    text: {
        fontSize: 26,
        marginVertical: 10,
        color: "#333"
    }
});