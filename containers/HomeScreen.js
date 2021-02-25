import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import {
    Button,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
const axios = require("axios");

export default function HomeScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://express-airbnb-api.herokuapp.com/rooms"
                );
                setData(response.data);
                console.log(response.data[0]);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    const ft_stars = (stars) => {
        const tabStars = [];
        const emptyStars = 5 - stars;

        for (let i = 0; i < stars; i++) {
            tabStars.push("x");
        }
        for (let i = 0; i < emptyStars; i++) {
            tabStars.push("o");
        }
        return tabStars;
    };

    return isLoading ? (
        <ActivityIndicator size="small" color="#EB5A62" />
    ) : (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Room", {
                                    id: item._id,
                                });
                            }}
                        >
                            <View>
                                <Image
                                    source={{ uri: item.photos[0].url }}
                                    resizeMode="contain"
                                    style={styles.photo}
                                ></Image>
                                <View style={styles.black}>
                                    <Text style={styles.price}>
                                        {item.price} €
                                    </Text>
                                </View>
                            </View>

                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                    }}
                                >
                                    <View style={{ width: "75%" }}>
                                        <Text
                                            style={styles.desc}
                                            numberOfLines={1}
                                        >
                                            {item.title}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                marginLeft: 10,
                                                marginTop: 15,
                                            }}
                                        >
                                            {ft_stars(item.ratingValue).map(
                                                (star) => {
                                                    return (
                                                        <View
                                                            style={styles.stars}
                                                        >
                                                            {star === "x" ? (
                                                                <Entypo
                                                                    name="star"
                                                                    size={24}
                                                                    color="orange"
                                                                />
                                                            ) : (
                                                                <Entypo
                                                                    name="star"
                                                                    size={24}
                                                                    color="lightgrey"
                                                                />
                                                            )}
                                                        </View>
                                                    );
                                                }
                                            )}

                                            <Text style={styles.review}>
                                                {item.reviews} reviews
                                            </Text>
                                        </View>
                                    </View>
                                    <Image
                                        style={styles.avatar}
                                        source={{
                                            uri: item.user.account.photo.url,
                                        }}
                                        resizeMode="contain"
                                    />
                                </View>
                                <View style={styles.separator}></View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item._id}
            />

            <Button
                title="Go to Profile"
                onPress={() => {
                    navigation.navigate("Profile", { userId: 123 });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    photo: {
        width: 480,
        height: 350,
    },
    black: {
        width: 100,
        height: 50,
        backgroundColor: "#EB5A62",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 25,
    },
    price: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",
    },
    desc: {
        marginLeft: 10,
        fontSize: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
    },
    review: {
        fontSize: 15,
        padding: 5,
        color: "#BBBBBB",
    },
    separator: {
        width: "90%",
        height: 2,
        backgroundColor: "#bbbb",
        marginTop: 10,
        marginLeft: 20,
    },
});
