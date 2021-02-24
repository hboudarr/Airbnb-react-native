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
        <Text>En chargement ...</Text>
    ) : (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity>
                            <View>
                                <Image
                                    source={{ uri: item.photos[0].url }}
                                    // source={item.photos[0].url}
                                    resizeMode="contain"
                                ></Image>
                                <Text>{item.price}</Text>
                            </View>

                            <View>
                                <View>
                                    <Text>{item.description}</Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                        }}
                                    >
                                        {ft_stars(item.ratingValue).map(
                                            (star) => {
                                                return (
                                                    <View>
                                                        {star === "x" ? (
                                                            <Entypo
                                                                name="star"
                                                                size={24}
                                                                color="orange"
                                                            />
                                                        ) : (
                                                            <Entypo
                                                                name="star-outlined"
                                                                size={24}
                                                                color="black"
                                                            />
                                                        )}
                                                    </View>
                                                );
                                            }
                                        )}
                                    </View>
                                </View>
                                <Image
                                    source={{
                                        uri: item.user.account.photo.url,
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.id}
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
