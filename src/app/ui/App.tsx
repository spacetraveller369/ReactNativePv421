import React, { useState, useEffect } from "react";
import { BackHandler, Image, TouchableOpacity, useWindowDimensions, View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "./AppStyle";
import Calc from "../../pages/calc/Calc";
import Home from "../../pages/home/Home";

interface IRouteInformation {
    slug: string;
}

export default function App() {
    const [history, setHistory] = useState<Array<IRouteInformation>>([]);
    const [page, setPage] = useState<IRouteInformation>({ slug: "calc" }); 
    const { width, height } = useWindowDimensions();

    const navigate = (route: IRouteInformation) => {
        if (route.slug !== page.slug) {
            setHistory([...history, page]);
            setPage(route);
        }
    };

    const popRoute = () => {
        if (history.length > 0) {
            const newHistory = [...history];
            const prevRoute = newHistory.pop()!;
            setPage(prevRoute);
            setHistory(newHistory);
        } else {
            BackHandler.exitApp();
        }
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            popRoute();
            return true;
        });
        return () => backHandler.remove();
    }, [history, page]);

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>
                
                <View style={AppStyle.appBar}>
                    <Text style={AppStyle.appBarTitle}>React Native PV-421</Text>
                </View>

              
                <View style={AppStyle.main}>
                    {page.slug === 'home' ? <Home /> : <Calc />}
                </View>

             
                {width < height && (
                    <View style={AppStyle.navBar}>
                        <TouchableOpacity 
                            style={AppStyle.navButton} 
                            onPress={() => navigate({ slug: "home" })}>
                            <Image 
                                source={require("../assets/img/home.png")} 
                                style={AppStyle.navIcon} 
                            />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={AppStyle.navButton} 
                            onPress={() => navigate({ slug: "calc" })}>
                            <Image 
                                source={require("../assets/img/calc.png")} 
                                style={AppStyle.navIcon} 
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}