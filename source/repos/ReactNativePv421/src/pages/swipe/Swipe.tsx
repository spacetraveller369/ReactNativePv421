import { GestureResponderEvent, Text, TouchableWithoutFeedback, useWindowDimensions, View } from "react-native";
import SwipeStyle from "./css/SwipeStyle";
import { useState } from "react";

var startEvent:GestureResponderEvent|null = null;
const minSwipeLength = 100;    // dip
const minSwipeVelocity = 0.2;  // 100 dip / 500 ms

interface ISwipeData {
    eventDetails: string,
    eventMessage: string
};

export default function Swipe() {
    const {width, height} = useWindowDimensions();
    const [data, setData] = useState<ISwipeData>({
        eventDetails: "",
        eventMessage: ""
    });

    const shortSide = Math.min(width, height);
    const fieldSide = 0.94 * shortSide;  // 94% від найменшого розміру
    const containerDirection = width < height ? "column" : "row";

    const beginGesture = (e:GestureResponderEvent) => {
        startEvent = e;
    };
    const endGesture = (e: GestureResponderEvent) => {
        if (startEvent != null) {
            const dx = e.nativeEvent.pageX - startEvent.nativeEvent.pageX;
            const dy = e.nativeEvent.pageY - startEvent.nativeEvent.pageY;
            const dt = e.nativeEvent.timestamp - startEvent.nativeEvent.timestamp;

           
            const isSwipeLongEnough = Math.abs(dx) > minSwipeLength || Math.abs(dy) > minSwipeLength;
            const isFastEnough = (Math.abs(dx) / dt > minSwipeVelocity) || (Math.abs(dy) / dt > minSwipeVelocity);

            if (isSwipeLongEnough && isFastEnough) {
                
                const ratio = Math.abs(dx) / Math.abs(dy);
                const isDiagonal = ratio > 0.5 && ratio < 2.0;

                if (isDiagonal) {
                    if ((dx > 0 && dy > 0) || (dx < 0 && dy < 0)) {
                        
                        data.eventMessage = "Main Diagonal (↘↖)";
                    } else {
                        
                        data.eventMessage = "Anti-Diagonal (↙↗)";
                    }
                } else {
                    
                    if (Math.abs(dx) > Math.abs(dy)) {
                        data.eventMessage = dx > 0 ? "Right" : "Left";
                    } else {
                        data.eventMessage = dy > 0 ? "Bottom" : "Top";
                    }
                }
            } else {
                data.eventMessage = "Too short or slow";
            }

            setData({
                ...data,
                eventDetails: `dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}, dt=${dt.toFixed(0)}`
            });
            startEvent = null;
        }
    };

    return <View style={[SwipeStyle.swipeContainer, {flexDirection: containerDirection}]}>

        <Text style={SwipeStyle.swipeTitle}>Swipe {data.eventMessage}</Text>

        <TouchableWithoutFeedback
            onPressIn={beginGesture}
            onPressOut={endGesture}>
                <View style={[SwipeStyle.swipeField, {width: fieldSide, height: fieldSide}]}>
                </View>
        </TouchableWithoutFeedback>

        <Text style={SwipeStyle.swipeTitle}>{data.eventDetails}</Text>

    </View>;
}
/*
Детектування свайпів зазвичай здійснюється з кількома обмеженнями:
- довжина проведення має бути більше граничної величини
- швидкість проведення має бути більше граничної величини (або час меншим)
- напрям свайпу має надійно визначатись (далекий від діагоналі)

Д.З. Реалізувати детектування діагональних жестів (свайпів):
додатково до попереднього ДЗ розділити жести на 4 типи - за кутом,
до якого вони спрямовані
*/