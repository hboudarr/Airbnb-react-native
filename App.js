import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import Logo from "./components/Logo";
import BackBtn from "./components/BackBtn";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const setToken = async (token) => {
        if (token) {
            AsyncStorage.setItem("userToken", token);
        } else {
            AsyncStorage.removeItem("userToken");
        }

        setUserToken(token);
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            // We should also handle error for production apps
            const userToken = await AsyncStorage.getItem("userToken");

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            setIsLoading(false);
            setUserToken(userToken);
        };

        bootstrapAsync();
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
                // No token found, user isn't signed in
                <Stack.Navigator>
                    <Stack.Screen
                        name="SingIn"
                        options={{ animationEnabled: false }}
                    >
                        {() => <SignInScreen setToken={setToken} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {() => <SignUpScreen setToken={setToken} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                // User is signed in
                <Stack.Navigator>
                    <Stack.Screen
                        name="Tab"
                        options={{
                            headerShown: false,
                            animationEnabled: false,
                        }}
                    >
                        {() => (
                            <Tab.Navigator
                                tabBarOptions={{
                                    activeTintColor: "tomato",
                                    inactiveTintColor: "gray",
                                }}
                            >
                                <Tab.Screen
                                    name="Home"
                                    options={{
                                        tabBarLabel: "Home",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-home"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Home"
                                                options={{
                                                    headerTitle: (
                                                        <Logo size="small" />
                                                    ),
                                                    headerBackTitleVisible: false,
                                                }}
                                            >
                                                {() => <HomeScreen />}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Profile"
                                                // options={{
                                                //     headerTitle: (
                                                //         <Logo size="small" />
                                                //     ),
                                                //     headerBackTitleVisible: false,
                                                //     headerLeft: () => (
                                                //         <BackBtn />
                                                //     ),
                                                // }}
                                            >
                                                {() => <ProfileScreen />}
                                            </Stack.Screen>

                                            <Stack.Screen
                                                name="Room"
                                                options={{
                                                    headerTitle: (
                                                        <Logo size="small" />
                                                    ),
                                                    headerBackTitleVisible: false,
                                                    headerLeft: () => (
                                                        <BackBtn />
                                                    ),
                                                }}
                                            >
                                                {() => <RoomScreen />}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                                <Tab.Screen
                                    name="Settings"
                                    options={{
                                        tabBarLabel: "Settings",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-options"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Settings"
                                                options={{
                                                    headerTitle: (
                                                        <Logo size="small" />
                                                    ),
                                                    tabBarLabel: "Settings",
                                                }}
                                            >
                                                {() => (
                                                    <SettingsScreen
                                                        setToken={setToken}
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>

                                {/*  */}

                                {/*  */}
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
