import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ButtonTypes } from "../../ui/button/FirmButton"; 

export interface IModalButton {
    title: string;
    action?: () => void;
    buttonType?: ButtonTypes;
}

interface Props {
    buttons: IModalButton[];
}

const MessageModal: React.FC<Props> = ({ buttons }) => {
    
    const isGrid = buttons.length > 3;

    const getButtonStyle = (type?: ButtonTypes) => {
        switch (type) {
            case ButtonTypes.success: return { backgroundColor: '#28a745' };
            case ButtonTypes.danger: return { backgroundColor: '#dc3545' };
            default: return { backgroundColor: '#007bff' };
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.buttonContainer, { flexWrap: isGrid ? 'wrap' : 'nowrap' }]}>
                {buttons.map((btn, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[
                            styles.button, 
                            getButtonStyle(btn.buttonType),
                            isGrid && { width: '45%', margin: '2%' } 
                        ]}
                        onPress={btn.action}
                    >
                        <Text style={styles.buttonText}>{btn.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15, width: '100%' },
    buttonContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: { 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 5,
        margin: 5,
        alignItems: 'center'
    },
    buttonText: { color: 'white', fontWeight: 'bold' }
});

export default MessageModal;