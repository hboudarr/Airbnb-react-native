import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
// import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

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
    const [username, setUsername] = useState();
    const [description, setDescription] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [eye, setEye] = useState("eye-with-line");
    const [eye1, setEye1] = useState("eye-with-line");
    const [visible, setVisible] = useState(true);
    const [visible1, setVisible1] = useState(true);

    const displayEye = () => {
        if (eye === "eye-with-line") {
            setEye("eye");
        } else {
            setEye("eye-with-line");
        }
        if (eye1 === "eye-with-line") {
            setEye1("eye");
        } else {
            setEye1("eye-with-line");
        }
    };

    const handlePress = async () => {
        try {
            if (email && password && description && username) {
                if (password === confirmPassword) {
                    const response = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        {
                            email: email,
                            username: username,
                            description: description,
                            password: password,
                        }
                    );
                    console.log(response.data);
                    setToken(response.data.token);
                    alert("Welcome in our community");
                } else {
                    setErrorMessage("Password must be the same");
                }
            } else {
                setErrorMessage("Please fill all fields");
            }
        } catch (error) {
            setErrorMessage(error.response.data.error);
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
                        <Text style={styles.signIn}>Sign up</Text>
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
                            placeholder="username"
                            // secureTextEntry={true}
                            onChangeText={(text) => {
                                setUsername(text);
                            }}
                        />

                        <TextInput
                            style={styles.inputDesc}
                            placeholder="Describe yourself in a few words..."
                            // secureTextEntry={true}
                            onChangeText={(text) => {
                                setDescription(text);
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
                        <TextInput
                            style={styles.input}
                            placeholder="confirm password"
                            secureTextEntry={visible1}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                            }}
                        />
                        <Entypo
                            name={eye}
                            size={18}
                            color="lightgrey"
                            style={styles.eye1}
                            onPress={() => {
                                setVisible1((visible1) => !visible1);
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
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SignIn");
                            }}
                        >
                            <Text style={[styles.text, styles.down]}>
                                Already have an account ? Sign in
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
        // marginTop: 100,
        marginBottom: 40,
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
    inputDesc: {
        width: 345,
        height: 100,
        borderColor: "#FFBAC0",
        borderWidth: 2,
        marginTop: 30,
    },
    down: { marginBottom: 130 },
    eye: {
        position: "absolute",
        right: 60,
        top: 275,
    },
    eye1: {
        position: "absolute",
        right: 60,
        top: 335,
    },
});
