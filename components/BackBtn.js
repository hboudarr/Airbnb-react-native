import React from "react";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function BackBtn() {
    const navigation = useNavigation();

    return (
        <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="#EB5A62"
            style={styles.icon}
            onPress={() => {
                navigation.goBack();
            }}
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        marginLeft: 10,
    },
});
