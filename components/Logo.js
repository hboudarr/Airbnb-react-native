import React from "react";
import { StyleSheet, Image } from "react-native";

export default function Logo({ size }) {
    return (
        <Image
            source={require("../assets/logo.png")}
            style={size === "large" ? styles.largeLogo : styles.smallLogo}
            resizeMode="contain"
        />
    );
}

const styles = StyleSheet.create({
    largeLogo: {
        height: 120,
        width: 110,
    },
    smallLogo: {
        height: 30,
        width: 30,
    },
});
