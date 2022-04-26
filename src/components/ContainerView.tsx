import React, { useMemo } from 'react';
import { View, ImageBackground, StyleProp, ViewStyle, StyleSheet } from "react-native";

type ContainerView = {
    style?: StyleProp<ViewStyle>;
    children: any;
}
export const ContainerView = (props: ContainerView) => {
    const combineStyles = (): any => {
        if (props.style) {
            return [styles.contentWrapper, props.style];
        } else {
            return styles.contentWrapper;
        }
    }
    const memoizedStyles = useMemo(combineStyles, [props.style]);
    return (
        <View style={styles.containerView}>
            <ImageBackground style={styles.bgImageStyle} source={require("../assets/images/bg.png")}>
                <View style={memoizedStyles}>
                    {props.children}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1
    },
    contentWrapper: {
        // paddingVertical: 50
    },
    bgImageStyle: {
        flex: 1
    }
});