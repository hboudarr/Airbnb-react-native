import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
// import { Dimensions } from "react-native";

import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const axios = require("axios");
// const win = Dimensions.get("window");

export default function SignInScreen({ setToken }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [eye, setEye] = useState("eye-with-line");
    const [visible, setVisible] = useState(true);

    const displayEye = () => {
        if (eye === "eye-with-line") {
            setEye("eye");
        } else {
            setEye("eye-with-line");
        }
    };

    const handlePress = async () => {
        try {
            if (email && password) {
                const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                        email: email,
                        password: password,
                    }
                );
                console.log(response.data);
                setToken(response.data.token);
                alert("Connection successfull");
            } else {
                setErrorMessage("Please fill all fields");
            }
        } catch (error) {
            if (error.response.status === 401) {
                setErrorMessage(
                    "username or password invalid, please try again !"
                );
            }
        }
    };

    return (
        <ScrollView>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={styles.up}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        ></Image>
                        <Text style={styles.signIn}>Sign In</Text>
                    </View>
                    <View style={styles.infos}>
                        <TextInput
                            style={styles.input}
                            placeholder="email"
                            onChangeText={(text) => {
                                setEmail(text);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            secureTextEntry={visible}
                            onChangeText={(text) => {
                                setPassword(text);
                            }}
                        />
                        <Entypo
                            name={eye}
                            size={18}
                            color="lightgrey"
                            style={styles.eye}
                            onPress={() => {
                                setVisible((visible) => !visible);
                                displayEye();
                            }}
                        />
                    </View>

                    <View style={styles.link}>
                        <Text style={styles.errMessage}>{errorMessage}</Text>
                        <TouchableOpacity
                            style={styles.signBut}
                            title="Sign in"
                            onPress={handlePress}
                        >
                            <Text style={[styles.text, styles.textSign]}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignUp");
                            }}
                        >
                            <Text style={[styles.text, styles.down]}>
                                No account ? Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
    },
    up: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: 50,
    },
    infos: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: 150,
    },
    signIn: {
        fontSize: 20,
        fontWeight: "600",
        color: "#717171",
        marginTop: 30,
    },
    input: {
        width: 345,
        height: 50,
        borderBottomColor: "#FFBAC0",
        borderBottomWidth: 2,
        marginTop: 10,
    },
    signBut: {
        borderColor: "#EB5A62",
        borderWidth: 3,
        borderRadius: 50,
        height: 50,
        width: 170,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    text: {
        color: "#717171",
    },
    textSign: {
        fontWeight: "600",
        fontSize: 16,
    },
    link: {
        justifyContent: "center",
        alignItems: "center",
    },
    errMessage: {
        color: "#FC8588",
        fontWeight: "500",
        marginBottom: 10,
    },
    down: { marginBottom: 130 },
    eye: {
        position: "absolute",
        right: 65,
        top: 88,
    },
});
