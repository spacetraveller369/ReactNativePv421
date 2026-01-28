import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Home from "../../pages/home/Home";
import AppStyle from "./AppStyle";
import { BackHandler, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import Calc from "../../pages/calc/Calc";

interface IRouteInformation {
    slug: string,
    parameters?: object
};

export default function App() {
    const [history, setHistory] = useState<Array<IRouteInformation>>([]);
    const [page, setPage] = useState<IRouteInformation>({slug: "home"});
    const {width, height} = useWindowDimensions();

    const navigate = (route:IRouteInformation) => {
        if(route.slug != page.slug) {
            setHistory([...history, page]);
            setPage(route);
        }
    };

    const popRoute = () => {
        if(history.length > 0) {
            const newHistory = [...history];
            const prevRoute = newHistory.pop()!;
            setPage(prevRoute);
            setHistory(newHistory);
        }
        else {
            BackHandler.exitApp();
        }
    };

    useEffect(() => {
        const listener = BackHandler.addEventListener("hardwareBackPress", () => {
            popRoute();
            return true;
        });
        return () => { listener.remove(); };
    }, [history, page]);

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'bottom']} style={AppStyle.container}>

                {width < height &&
                    <View style={AppStyle.appBar}>
                        <Text style={AppStyle.appBarTitle}>React Native PV-421</Text>
                    </View>
                }            

                <View style={AppStyle.main}>
                    { page.slug == 'home' ? <Home />
                    : page.slug == 'calc' ? <Calc />
                    : <Text>404</Text>
                    }                
                </View>

                {width < height &&
                    <View style={AppStyle.navBar}>
                        
                        <TouchableOpacity // home button
                            style={AppStyle.navButton}
                            onPress={() => navigate({slug: "home"})}>
                            <Image 
                                source={require("../assets/img/home.png")}
                                style={AppStyle.navIcon} />
                        </TouchableOpacity>

                        
                        <TouchableOpacity // calc button
                            style={AppStyle.navButton}
                            onPress={() => navigate({slug: "calc"})}>
                            <Image 
                                source={require("../assets/img/calc.png")}
                                style={AppStyle.navIcon} />
                        </TouchableOpacity>
                    </View>
                }
                
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

