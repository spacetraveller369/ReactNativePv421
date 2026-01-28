import { Text } from "react-native";
import HomeStyle from "./css/HomeStyle";

export { Text } from "react-native";

export default function Home() {
    return <Text style={HomeStyle.hello}> Hello, World! </Text>;
}