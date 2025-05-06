import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
    label: string;
    placeholder: string;
}

export default function InputText({label, placeholder}: Props) {

    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                keyboardType="default"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 15,
      },
      label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
      },
      input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
      },
});