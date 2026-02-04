import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ICalcButtonData from "./ICalcButtonData";
import CalcButtonType from "./CalcButtonType";

export default function CalcButton({data}:{data:ICalcButtonData}) {
    const isDisabled = data.buttonType === CalcButtonType.disabled;

    return (
        <TouchableOpacity 
            disabled={isDisabled}
            onPress={() => data.action && data.action(data)}
            style={[
                styles.calcButton,
                ( data.buttonType === CalcButtonType.digit ? styles.digitButton
                : data.buttonType === CalcButtonType.operation ? styles.operButton
                : data.buttonType === CalcButtonType.disabled ? styles.disabledButton
                : styles.equalButton
                )
            ]}>
            <Text style={[styles.calcButtonText, isDisabled && styles.disabledText]}>
                {data.text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    calcButton: {
        flex: 1,
        height: 60,
        margin: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    calcButtonText: {
        color: "white",
        fontSize: 22,
    },
    disabledText: {
        color: "#555",
    },
    digitButton: { backgroundColor: "#333" },
    operButton: { backgroundColor: "#444" },
    equalButton: { backgroundColor: "#4e97f1" },
    disabledButton: { backgroundColor: "#222" },
});