import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView } from 'react-native';


const CalcButtonType = {
    digit: 'digit',
    operation: 'operation',
    equal: 'equal',
    disabled: "disabled",
} as const;

type CalcButtonType = (typeof CalcButtonType)[keyof typeof CalcButtonType];

interface ICalcButtonData {
    text: string;
    buttonType: CalcButtonType;
    action?: (data: ICalcButtonData) => void;
}


function CalcButton({ data }: { data: ICalcButtonData }) {
    const isDisabled = data.buttonType === CalcButtonType.disabled;

    return (
        <TouchableOpacity
            disabled={isDisabled}
            onPress={() => { if (data.action && !isDisabled) data.action(data); }}
            style={[
                styles.calcButton,
                data.buttonType === CalcButtonType.digit && styles.digitButton,
                data.buttonType === CalcButtonType.operation && styles.operButton,
                data.buttonType === CalcButtonType.equal && styles.equalButton,
                data.buttonType === CalcButtonType.disabled && styles.disabledButton,
            ]}
        >
            <Text style={[
                styles.calcButtonText,
                isDisabled && { color: "#555" } 
            ]}>
                {data.text}
            </Text>
        </TouchableOpacity>
    );
}


export default function Home() {
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;

    return (
        <SafeAreaView style={styles.calc}>
            <View style={{ flex: 1, padding: 10 }}>
                {isLandscape ? (
                    
                    <View style={styles.containerResExpMem}>
                        <View style={styles.containerExpMem}>
                            <Text style={styles.expression}>120 + 5</Text>
                            <View style={styles.memoryRow}>
                                <Text style={styles.memoryButton}>MR</Text>
                                <Text style={styles.memoryButton}>MC</Text>
                            </View>
                        </View>
                        <Text style={[styles.result, { flex: 1 }]}>125</Text>
                    </View>
                ) : (
                    
                    <View style={{ flex: 1 }}>
                        <Text style={styles.expression}>120 + 5</Text>
                        <Text style={styles.result}>125</Text>
                        <View style={styles.memoryRow}>
                            <Text style={styles.memoryButton}>MR</Text>
                            <Text style={styles.memoryButton}>MC</Text>
                        </View>
                    </View>
                )}

                
                <View style={{ flex: 2, marginTop: 20 }}>
                    <View style={styles.buttonRow}>
                        <CalcButton data={{ text: "7", buttonType: CalcButtonType.digit }} />
                        <CalcButton data={{ text: "8", buttonType: CalcButtonType.digit }} />
                        <CalcButton data={{ text: "M+", buttonType: CalcButtonType.disabled }} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    calc: {
        flex: 1,
        backgroundColor: "#222",
    },
    expression: {
        fontSize: 20,
        color: "#bbb",
        textAlign: "right",
    },
    result: {
        fontSize: 40,
        color: "white", 
        textAlign: "right",
    },
    memoryRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    memoryButton: {
        color: "#bbb",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
    },
    calcButton: {
        flex: 1,
        margin: 2,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    calcButtonText: {
        color: "white",
        fontSize: 18,
    },
    digitButton: { backgroundColor: "#3a3a3a" },
    operButton: { backgroundColor: "#333" },
    equalButton: { backgroundColor: "#4e97f1" },
    disabledButton: { backgroundColor: "#282828" },
   
    containerResExpMem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
    },
    containerExpMem: {
        flex: 2,
        flexDirection: "column",
    }
});
