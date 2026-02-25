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

            
            const isLongEnough = Math.sqrt(dx * dx + dy * dy) > minSwipeLength;
            const isFastEnough = (Math.abs(dx) / dt > minSwipeVelocity) || (Math.abs(dy) / dt > minSwipeVelocity);

            if (isLongEnough && isFastEnough) {
                
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                if (angle >= 0 && angle < 90) {
                    data.eventMessage = "Diagonal: Down-Right (↘)";
                } else if (angle >= 90 && angle <= 180) {
                    data.eventMessage = "Diagonal: Down-Left (↙)";
                } else if (angle < -90 && angle >= -180) {
                    data.eventMessage = "Diagonal: Up-Left (↖)";
                } else {
                    data.eventMessage = "Diagonal: Up-Right (↗)";
                }
            } else {
                data.eventMessage = "Swipe too short or slow";
            }

            setData({
                ...data,
                eventDetails: `dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}, angle=${(Math.atan2(dy, dx) * 180 / Math.PI).toFixed(0)}°`
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
