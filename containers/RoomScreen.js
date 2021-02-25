import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import { SwiperFlatList } from "react-native-swiper-flatlist";

import {
    Button,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
} from "react-native";
const axios = require("axios");

export default function RoomScreen() {
    const { params } = useRoute();
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
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

    const ft_swiper = () => {
        let pictures = [];
        data.photos.map((elem) => {
            pictures.push(elem.url);
        });
        return pictures;
    };

    return isLoading ? (
        // <Text>En chargement ...</Text>
        <ActivityIndicator size="small" color="#EB5A62" />
    ) : (
        <View style={styles.container}>
            <View>
                <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    index={0}
                    data={ft_swiper()}
                    renderItem={({ item }) => (
                        <View style={[styles.child, { backgroundColor: item }]}>
                            <Image
                                source={{ uri: item }}
                                resizeMode="contain"
                                style={styles.photo}
                            ></Image>
                        </View>
                    )}
                ></SwiperFlatList>
                <View style={styles.black}>
                    <Text style={styles.price}>{data.price} €</Text>
                </View>
            </View>
            <View>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <View style={{ width: "75%" }}>
                        <Text style={styles.desc} numberOfLines={1}>
                            {data.title}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                marginLeft: 10,
                                marginTop: 15,
                            }}
                        >
                            {ft_stars(data.ratingValue).map((star) => {
                                return (
                                    <View style={styles.stars}>
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
                            })}

                            <Text style={styles.review}>
                                {data.reviews} reviews
                            </Text>
                        </View>
                    </View>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: data.user.account.photo.url,
                        }}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.padd}>
                    <Text style={styles.description} numberOfLines={3}>
                        {data.description}
                    </Text>
                </View>
            </View>

            <Button
                title="Go back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View>
    );
}

const { width } = Dimensions.get("window");
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
    padd: {
        padding: 20,
    },
    container: { flex: 1, backgroundColor: "white" },
    child: { width, justifyContent: "center" },
    text: { fontSize: width * 0.5, textAlign: "center" },
});
