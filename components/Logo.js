import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Logo({ size }) {
    return (
        <Image
            source={require("../assets/logo.png")}
            style={styles.small}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    small: {
        height: 30,
        width: 30,
    },
});
