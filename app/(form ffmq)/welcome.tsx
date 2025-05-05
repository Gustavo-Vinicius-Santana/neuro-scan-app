import { View, Text, StyleSheet } from "react-native";


export default function Welcome() {
    return (
        <View style={styles.container}>
            <Text>Bem-vindo ao formulario FFMQ</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});