import { StyleSheet, TextInput } from "react-native";

type TransactionSearchProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export function TransactionSearch({
    value,
    onChangeText,
}: TransactionSearchProps) {
    return (
        <TextInput
            style={styles.input}
            placeholder="Search transactions"
            accessibilityLabel="Search transactions"
            value={value}
            onChangeText={onChangeText}
            autoCapitalize="none"
            autoCorrect={false}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 16,
        fontSize: 16,
        color: '#17212B',
    }
})