import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { textColor } from "../../../../features/values/colors";
import ICalcButtonData from "./ICalcButtonData";
import CalcButtonType from "./CalcButtonType";

export default function CalcButton({data}:{data:ICalcButtonData}) {
    return <TouchableOpacity 
        onPress={() => { 
            if(data.action && data.buttonType != CalcButtonType.disabled) {
                data.action(data);
            }
        }} 
        style={[
            styles.calcButton,
            ( data.buttonType == CalcButtonType.digit ? styles.digitButton
            : data.buttonType == CalcButtonType.operation ? styles.operButton
            : data.buttonType == CalcButtonType.disabled ? styles.disabledButton
            : styles.equalButton
            )]}>
        <Text style={styles.calcButtonText}>{data.text}</Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    calcButton: {
        flex: 1,
        margin: 5,            
        borderRadius: 15,     
        height: 70,           
        justifyContent: "center",
        alignItems: "center",
        elevation: 3, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    calcButtonText: {
        color: textColor,     
        fontSize: 22,         
        fontWeight: "500",
    },
    digitButton: {
        backgroundColor: "#333333", 
    },
    operButton: {
        backgroundColor: "#444444", 
    },
    equalButton: {
        backgroundColor: "#4e97f1", 
    },
    disabledButton: {
        backgroundColor: "#222222", 
        opacity: 0.5,               
    },
    disabledText: {
        color: "#666666",           
    }
});
