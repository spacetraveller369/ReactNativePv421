import { Text, useWindowDimensions, View } from "react-native";
import CalcStyle from "./css/CalcStyle";
import CalcButton from "./ui/button/CalcButton";
import CalcButtonType from "./ui/button/CalcButtonType";
import ICalcButtonData from "./ui/button/ICalcButtonData";
import { useState } from "react";

export default function Calc() {
    
    const { width, height } = useWindowDimensions();
    const [result, setResult] = useState<string>("0");
    const [expression, setExpression] = useState<string>("");
    const [needClear, setNeedClear] = useState<boolean>(false);
    const [isError, setError] = useState<boolean>(false);

    
    const formatDisplay = (text: string) => {
        if (text === "0" || isError) return text;
        const parts = text.split(',');
       
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0"); 
        return parts.join(',');
    };

    const digitClick = (btn: ICalcButtonData) => {
        let res = result.replace(/\u00A0/g, ''); 
        if (res === "0" || needClear || isError) {
            res = "";
            setNeedClear(false);
            setError(false);
        }
        if (res.length < 16) {
            setResult(res + btn.text);
        }
    };

    const backspaceClick = () => {
        let res = result.replace(/\u00A0/g, '');
        if (res.length > 1) {
            setResult(res.slice(0, -1));
        } else {
            setResult("0");
        }
    };

    
    const memoryKeys = [
        { text: "MC", type: CalcButtonType.disabled },
        { text: "MR", type: CalcButtonType.disabled },
        { text: "M+", type: CalcButtonType.operation },
        { text: "M-", type: CalcButtonType.operation },
        { text: "MS", type: CalcButtonType.operation },
    ];

    
    const portraitView = () => (
        <View style={CalcStyle.calc}>
            <View>
                <Text style={CalcStyle.expression}>{expression}</Text>
                <Text style={[CalcStyle.result, { fontSize: result.length <= 10 ? 50 : 35 }]}>
                    {formatDisplay(result)}
                </Text>
            </View>

            <View style={CalcStyle.memoryRow}>
                {memoryKeys.map((m, i) => (
                    <CalcButton key={i} isMemory={true} data={{ text: m.text, buttonType: m.type }} />
                ))}
            </View>

            <View style={CalcStyle.buttonRow}>
                <CalcButton data={{ text: "%", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "CE", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "C", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "\u232B", buttonType: CalcButtonType.operation, action: backspaceClick }} />
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton data={{ text: "1/x", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "x\u00B2", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "\u221A", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "\u00F7", buttonType: CalcButtonType.operation }} />
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton data={{ text: "7", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "8", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "9", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "\u00D7", buttonType: CalcButtonType.operation }} />
            </View>
            <View style={CalcStyle.buttonRow}>
                <CalcButton data={{ text: "\u00B1", buttonType: CalcButtonType.digit }} />
                <CalcButton data={{ text: "0", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: ",", buttonType: CalcButtonType.digit }} />
                <CalcButton data={{ text: "=", buttonType: CalcButtonType.equal }} />
            </View>
        </View>
    );

    const landscapeView = () => (
        <View style={CalcStyle.calc}>
            <View style={CalcStyle.containerResExpMem}>
                <View style={CalcStyle.containerExpMem}>
                    <Text style={CalcStyle.expression}>{expression}</Text>
                    <View style={CalcStyle.memoryRow}>
                        {memoryKeys.map((m, i) => (
                            <CalcButton key={i} isMemory={true} data={{ text: m.text, buttonType: m.type }} />
                        ))}
                    </View>
                </View>
                <Text style={[CalcStyle.result, { fontSize: 40 }]}>
                    {formatDisplay(result)}
                </Text>
            </View>

            <View style={CalcStyle.buttonRow}>
                <CalcButton data={{ text: "7", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "8", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "9", buttonType: CalcButtonType.digit, action: digitClick }} />
                <CalcButton data={{ text: "\u00F7", buttonType: CalcButtonType.operation }} />
                <CalcButton data={{ text: "C", buttonType: CalcButtonType.operation }} />
            </View>
             <View style={CalcStyle.buttonRow}>
                 <CalcButton data={{ text: "1/x", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "\u00D7", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "4", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "5", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "6", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "CE", buttonType: CalcButtonType.operation }} />
            </View>
            <View style={CalcStyle.buttonRow}>
                 <CalcButton data={{ text: "x\u00B2", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "-", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "1", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "2", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "3", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: "\u232B", buttonType: CalcButtonType.operation, action: backspaceClick }} />
            </View>
            <View style={CalcStyle.buttonRow}>
                 <CalcButton data={{ text: "\u221A", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "+", buttonType: CalcButtonType.operation }} />
                 <CalcButton data={{ text: "\u00B1", buttonType: CalcButtonType.digit }} />
                 <CalcButton data={{ text: "0", buttonType: CalcButtonType.digit, action: digitClick }} />
                 <CalcButton data={{ text: ",", buttonType: CalcButtonType.digit }} />
                 <CalcButton data={{ text: "=", buttonType: CalcButtonType.equal }} />
            </View>
         </View>
     );



    return width < height ? portraitView() : landscapeView();
}
/*
Д.З. Модифікувати стиль для неактивної кнопки - зробити колір тексту менш яскравим. 
Доповнити деактивацією усі кнопки, що цього стосуються.
Внести усі напрацювання до ландшафтного представлення застосунку. 
До репозиторію або окремо до ДЗ додати два скріншоти у двох представленнях. 


Д.З. Реалізувати розділення розрядів цифр при введенні довгих чисел
(пробіл між групами цифр по 3:   12 345 678), можна використати
спец символи Юнікоду - короткі пробіли. 
Скоригувати обмеження - не враховувати пробіли в обмеженні на 
максимальну кількість цифр, що можна набрати. 
Зауважити роботу Backspace, оскільки він перерозподілятиме пробіли
(12 345 678 -> 1 234 567)
*/